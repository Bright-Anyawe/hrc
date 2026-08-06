import fs from 'fs';
import path from 'path';

/**
 * Local JSON-file store of newsletter subscribers.
 *
 * Purpose: keep a canonical, always-available list of subscriber emails that
 * the new-post broadcast (`scripts/notify-new-post.mjs`) can email directly.
 * Brevo is the source of truth when configured; this store is the fallback
 * (and merge source) so a broadcast can still reach subscribers even if a
 * Brevo key is missing or the list API is down.
 *
 * NOTE ON SERVERLESS: on platforms where the filesystem is read-only at
 * runtime (e.g. Vercel functions) the file write is ephemeral per-instance.
 * For those deployments Brevo remains the reliable store; this file is used
 * by the build-time broadcast and local/self-hosted setups.
 */

export interface NewsletterSubscriber {
  email: string;
  name?: string;
  subscribedAt: string;
  source?: string;
}

export interface NewsletterStore {
  /** Slug of the newest post that subscribers were last emailed about. */
  lastNotifiedSlug: string | null;
  /** ISO timestamp of the last successful broadcast. */
  lastNotifiedAt: string | null;
  subscribers: NewsletterSubscriber[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const STORE_PATH = path.join(DATA_DIR, 'newsletter-subscribers.json');

const EMPTY_STORE: NewsletterStore = {
  lastNotifiedSlug: null,
  lastNotifiedAt: null,
  subscribers: [],
};

function readStore(): NewsletterStore {
  try {
    if (!fs.existsSync(STORE_PATH)) return { ...EMPTY_STORE };
    const raw = fs.readFileSync(STORE_PATH, 'utf-8');
    const parsed = JSON.parse(raw) as Partial<NewsletterStore>;
    return {
      ...EMPTY_STORE,
      ...parsed,
      subscribers: Array.isArray(parsed.subscribers) ? parsed.subscribers : [],
    };
  } catch (err) {
    console.error('[newsletter-store] Failed to read store:', err);
    return { ...EMPTY_STORE };
  }
}

function writeStore(store: NewsletterStore): boolean {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[newsletter-store] Failed to write store:', err);
    return false;
  }
}

/** Normalize an email to lowercase, trimmed form. Returns '' if invalid. */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Add a subscriber to the local store. No-op if the address already exists.
 * Returns true when a new subscriber was added.
 */
export function addSubscriber(
  email: string,
  name?: string,
  source = 'website',
): boolean {
  const normalized = normalizeEmail(email);
  if (!normalized) return false;

  const store = readStore();
  if (store.subscribers.some((s) => s.email === normalized)) return false;

  store.subscribers.push({
    email: normalized,
    name: name?.trim() || undefined,
    subscribedAt: new Date().toISOString(),
    source,
  });

  return writeStore(store);
}

/** All subscribers, deduplicated by email. */
export function getSubscribers(): NewsletterSubscriber[] {
  const store = readStore();
  const seen = new Set<string>();
  const unique: NewsletterSubscriber[] = [];
  for (const s of store.subscribers) {
    const key = normalizeEmail(s.email);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    unique.push(s);
  }
  return unique;
}

/** The slug subscribers were last emailed about (null if never broadcast). */
export function getLastNotifiedSlug(): string | null {
  return readStore().lastNotifiedSlug;
}

/** Record that a broadcast was sent for the given post slug. */
export function markNotified(slug: string): boolean {
  const store = readStore();
  store.lastNotifiedSlug = slug;
  store.lastNotifiedAt = new Date().toISOString();
  return writeStore(store);
}
