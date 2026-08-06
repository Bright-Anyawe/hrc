#!/usr/bin/env node
/**
 * scripts/notify-new-post.mjs
 *
 * Emails every newsletter subscriber whenever a NEW blog post is published.
 *
 * How it decides what's "new":
 *   - Scans content/posts/*.md, picks the newest post by its `date` frontmatter.
 *   - Compares against `lastNotifiedSlug` stored in data/newsletter-subscribers.json.
 *   - If they differ (or --force), it broadcasts. Otherwise it does nothing —
 *     so it's safe to run on EVERY build (see postbuild hook in package.json).
 *
 * Where subscribers come from (merged + deduped):
 *   1. Brevo list contacts — GET /v3/contacts/lists/{BREVO_LIST_ID}/contacts
 *   2. Local store data/newsletter-subscribers.json (fallback)
 *
 * Sending:
 *   Uses Resend (RESEND_API_KEY). Without a key it runs in DRY-RUN mode and
 *   prints exactly what WOULD be sent, so you can test the whole pipeline
 *   before configuring email.
 *
 * Usage:
 *   node scripts/notify-new-post.mjs [--dry-run] [--force] [--record]
 *   node scripts/notify-new-post.mjs --add user@example.com "Jane Doe"
 *   node scripts/notify-new-post.mjs --list
 *   node scripts/notify-new-post.mjs --help
 *
 * Flags:
 *   --dry-run   Print the email + recipients without sending. (Also implied
 *               automatically when RESEND_API_KEY is not set.)
 *   --force     Broadcast even if this post was already notified.
 *   --record    Update lastNotifiedSlug even in dry-run (useful to mark a post
 *               as "already announced" without sending).
 *   --add, --list   Manage the local subscriber store (for testing).
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');
const DATA_DIR = path.join(process.cwd(), 'data');
const STORE_PATH = path.join(DATA_DIR, 'newsletter-subscribers.json');
const SITE_URL = process.env.SITE_URL || 'https://www.hrcghana.com';
const FROM = process.env.RESEND_FROM || 'HRC Ghana <onboarding@resend.dev>';
const RESEND_API_URL = 'https://api.resend.com/emails';

/* ── Tiny local store helpers (mirror of lib/newsletter-store.ts) ── */

function readStore() {
  try {
    if (!fs.existsSync(STORE_PATH)) {
      return { lastNotifiedSlug: null, lastNotifiedAt: null, subscribers: [] };
    }
    const raw = JSON.parse(fs.readFileSync(STORE_PATH, 'utf-8'));
    return {
      lastNotifiedSlug: raw?.lastNotifiedSlug ?? null,
      lastNotifiedAt: raw?.lastNotifiedAt ?? null,
      subscribers: Array.isArray(raw?.subscribers) ? raw.subscribers : [],
    };
  } catch (err) {
    console.error('[notify] Failed to read store:', err);
    return { lastNotifiedSlug: null, lastNotifiedAt: null, subscribers: [] };
  }
}

function writeStore(store) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), 'utf-8');
}

function addToStore(email, name) {
  const store = readStore();
  const key = email.trim().toLowerCase();
  if (!key) return;
  if (store.subscribers.some((s) => s.email === key)) {
    console.log(`[notify] ${key} is already in the local store.`);
    return;
  }
  store.subscribers.push({
    email: key,
    name: name?.trim() || undefined,
    subscribedAt: new Date().toISOString(),
    source: 'manual-test',
  });
  writeStore(store);
  console.log(`[notify] Added ${key} to local store (${store.subscribers.length} total).`);
}

/* ── Post discovery ── */

function getNewestPost() {
  if (!fs.existsSync(POSTS_DIR)) return null;
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));
  if (files.length === 0) return null;

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
      const { data } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ''),
        title: data.title ?? file,
        excerpt: data.excerpt ?? '',
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
        image: data.image ?? '',
        author: data.author ?? 'HRC Ghana Team',
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
}

/* ── Subscriber sources ── */

async function getBrevoSubscribers() {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID);
  if (!apiKey || !Number.isInteger(listId) || listId <= 0) return [];

  const emails = [];
  try {
    let offset = 0;
    const limit = 500;
    for (let page = 0; page < 20; page++) {
      const url = new URL(
        `https://api.brevo.com/v3/contacts/lists/${listId}/contacts`,
      );
      url.searchParams.set('limit', String(limit));
      url.searchParams.set('offset', String(offset));
      const res = await fetch(url, { headers: { 'api-key': apiKey, Accept: 'application/json' } });
      if (!res.ok) {
        console.warn(`[notify] Brevo list fetch failed (${res.status}).`);
        break;
      }
      const body = await res.json();
      const contacts = body?.contacts ?? [];
      for (const c of contacts) {
        if (c?.email) emails.push({ email: c.email, name: c?.attributes?.FIRSTNAME ?? undefined });
      }
      if (body?.count < limit || contacts.length === 0) break;
      offset += limit;
    }
    console.log(`[notify] Brevo list provided ${emails.length} subscribers.`);
  } catch (err) {
    console.warn('[notify] Brevo list request failed:', err);
  }
  return emails;
}

function getLocalSubscribers() {
  return readStore().subscribers;
}

async function getAllSubscribers() {
  const [brevo, local] = await Promise.all([getBrevoSubscribers(), getLocalSubscribers()]);
  const seen = new Set();
  const merged = [];
  for (const s of [...brevo, ...local]) {
    const key = (s.email || '').trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    merged.push(s);
  }
  return merged;
}

/* ── Email sending (Resend via fetch) ── */

function buildEmailHtml(post) {
  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const imageBlock = post.image
    ? `<img src="${post.image}" alt="" style="width:100%;max-width:100%;border-radius:12px;display:block;margin-bottom:16px;"/>`
    : '';
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a;">
    <div style="background:#0b1f3a;padding:20px 24px;border-radius:12px 12px 0 0;">
      <p style="margin:0;color:#c9a227;font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;">New on the HRC Ghana Blog</p>
      <h2 style="margin:6px 0 0;color:#ffffff;font-size:20px;">Hedge Resource Centre</h2>
    </div>
    <div style="border:1px solid #eee;border-top:none;padding:24px;border-radius:0 0 12px 12px;">
      ${imageBlock}
      <h1 style="margin:0 0 10px;color:#0b1f3a;font-size:22px;line-height:1.35;">${post.title}</h1>
      <p style="color:#555;font-size:15px;line-height:1.6;">${post.excerpt}</p>
      <p style="margin:0 0 6px;color:#888;font-size:12px;">By ${post.author} &middot; ${new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
      <p style="margin:24px 0 0;text-align:center;">
        <a href="${postUrl}" style="display:inline-block;background:#0b1f3a;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:999px;font-weight:bold;font-size:14px;">Read the full article</a>
      </p>
      <hr style="border:none;border-top:1px solid #eee;margin:28px 0 16px;" />
      <p style="color:#888;font-size:12px;line-height:1.6;">
        Hedge Resource Centre &middot; Quality Our Priority<br/>
        You are receiving this because you subscribed at hrcghana.com.<br/>
        To unsubscribe, <a href="mailto:info@hrcghana.com?subject=Unsubscribe" style="color:#c9a227;">reply with "Unsubscribe"</a> or email us directly.
      </p>
    </div>
  </div>`;
}

async function sendEmail(subscriber, post) {
  const res = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM,
      to: [subscriber.email],
      subject: `New article: ${post.title}`,
      html: buildEmailHtml(post),
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend ${res.status}: ${body}`);
  }
  return res.json();
}

/* ── Main ── */

const args = process.argv.slice(2);

function printHelp() {
  console.log(`
HRC Ghana — Notify subscribers about a new blog post

Usage:
  node scripts/notify-new-post.mjs [options]
  node scripts/notify-new-post.mjs --add user@example.com "Jane Doe"
  node scripts/notify-new-post.mjs --list
  node scripts/notify-new-post.mjs --help

Options:
  --dry-run   Print what would be sent without sending (auto-enabled when
              RESEND_API_KEY is not set).
  --force     Broadcast even if this post was already announced.
  --record    Update lastNotifiedSlug in dry-run (mark announced w/o sending).
  --add <email> [name]   Add a subscriber to the local store (for testing).
  --list      List subscribers currently in the local store.
`);
}

if (args.includes('--help') || args.includes('-h')) {
  printHelp();
  process.exit(0);
}

if (args.includes('--list')) {
  const subs = getLocalSubscribers();
  if (subs.length === 0) {
    console.log('[notify] Local store is empty. Use --add to seed one for testing.');
  } else {
    console.log(`[notify] Local subscribers (${subs.length}):`);
    for (const s of subs) console.log(`  - ${s.email}${s.name ? ` (${s.name})` : ''}`);
  }
  process.exit(0);
}

const addIdx = args.indexOf('--add');
if (addIdx !== -1) {
  const email = args[addIdx + 1];
  const name = args[addIdx + 2];
  if (!email) {
    console.error('[notify] --add requires an email address.');
    process.exit(1);
  }
  addToStore(email, name);
  process.exit(0);
}

const dryRun = args.includes('--dry-run') || !process.env.RESEND_API_KEY;
const force = args.includes('--force');
const record = args.includes('--record');

console.log('─'.repeat(60));
console.log('[notify] HRC Ghana — new-post broadcast');
console.log('[notify] Mode:', dryRun ? 'DRY-RUN (no emails sent)' : 'LIVE (sending emails)');

const post = getNewestPost();
if (!post) {
  console.error('[notify] No posts found in content/posts. Nothing to announce.');
  process.exit(1);
}

const store = readStore();
const isNew = store.lastNotifiedSlug !== post.slug;
if (!force && !isNew) {
  console.log(`[notify] Newest post "${post.slug}" was already announced (${store.lastNotifiedAt}).`);
  console.log('[notify] Nothing to do. Use --force to broadcast anyway.');
  process.exit(0);
}

const subscribers = await getAllSubscribers();
if (subscribers.length === 0) {
  console.log('[notify] No subscribers yet. Sign up via the footer newsletter form,');
  console.log('[notify] or seed one locally with:  node scripts/notify-new-post.mjs --add you@example.com');
  process.exit(0);
}

console.log(`[notify] Newest post: ${post.title} (${post.slug})`);
console.log(`[notify] Recipients (${subscribers.length}):`);
for (const s of subscribers) console.log(`  - ${s.email}${s.name ? ` (${s.name})` : ''}`);

if (dryRun) {
  console.log('\n[notify] ── EMAIL PREVIEW (not sent) ──');
  console.log(`  Subject: New article: ${post.title}`);
  console.log(`  From:    ${FROM}`);
  console.log(`  Link:    ${SITE_URL}/blog/${post.slug}`);
  console.log('[notify] ─────────────────────────────────');
  if (record) {
    writeStore({ ...store, lastNotifiedSlug: post.slug, lastNotifiedAt: new Date().toISOString() });
    console.log('[notify] --record set: this post is now marked as announced.');
  } else {
    console.log('[notify] Pass --record to mark this post as announced without sending.');
  }
  process.exit(0);
}

// LIVE
let sent = 0;
for (const subscriber of subscribers) {
  try {
    await sendEmail(subscriber, post);
    sent++;
    console.log(`  ✓ sent to ${subscriber.email}`);
  } catch (err) {
    console.error(`  ✗ failed for ${subscriber.email}:`, err.message || err);
  }
}

if (sent > 0) {
  writeStore({ ...store, lastNotifiedSlug: post.slug, lastNotifiedAt: new Date().toISOString() });
  console.log(`[notify] Done. Emailed ${sent}/${subscribers.length} subscribers.`);
} else {
  console.log('[notify] No emails sent — store NOT updated.');
}
