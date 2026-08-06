/**
 * Client-side helpers for the "new blog post" nudge.
 *
 * Uses localStorage to remember which post slug the visitor has already seen.
 * A new post (newer than what they've seen) triggers the welcome toast and a
 * small "NEW" badge in the navigation. Works entirely in the browser so no
 * account, cookie, or backend is required.
 */

const SEEN_KEY = 'hrc:blog-seen';

/** Slug of the newest post this visitor has acknowledged. */
export function getSeenSlug(): string | null {
  try {
    return localStorage.getItem(SEEN_KEY);
  } catch {
    return null;
  }
}

/** Mark a post slug as acknowledged by the visitor. */
export function markSeen(slug: string): void {
  try {
    localStorage.setItem(SEEN_KEY, slug);
  } catch {
    /* localStorage unavailable (private mode etc.) — fail silently */
  }
}

/** True when the given post is newer than anything the visitor has seen. */
export function hasUnseenPost(slug: string): boolean {
  const seen = getSeenSlug();
  return !seen || seen !== slug;
}
