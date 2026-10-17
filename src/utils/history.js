const MAX_ENTRIES = 10;

const makeId = () =>
  globalThis.crypto?.randomUUID?.() ??
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

// The first non-empty line of the root becomes the title ("Frontend Developer (Junior)")
export function getTitle(jd = '') {
  const firstLine =
    jd
      .split('\n')
      .map((line) => line.trim())
      .find(Boolean) ?? 'Untitled check';
  return firstLine.length > 50 ? `${firstLine.slice(0, 50).trimEnd()}…` : firstLine;
}

export function createEntry({ jd, resume, result, now = Date.now(), id = makeId() }) {
  return {
    id,
    createdAt: now,
    title: getTitle(jd),
    jd,
    resume,
    score: result.score,
    matchedCount: result.matched.length,
    missingCount: result.missing.length,
  };
}

// Add new entry at the top; remove older entries (cover letter + resume), keeping only up to the maximum limit.
export function addEntry(list, entry, max = MAX_ENTRIES) {
  const rest = list.filter((e) => !(e.jd === entry.jd && e.resume === entry.resume));
  return [entry, ...rest].slice(0, max);
}

export function removeEntry(list, id) {
  return list.filter((e) => e.id !== id);
}

export function isSaved(list, jd, resume) {
  return list.some((e) => e.jd === jd && e.resume === resume);
}
