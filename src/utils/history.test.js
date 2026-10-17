import { describe, it, expect } from 'vitest';
import { addEntry, createEntry, getTitle, isSaved, removeEntry } from './history';

const result = { score: 70, matched: [{}, {}], missing: [{}] };
const make = (jd, resume = 'r', id = jd) =>
  createEntry({ jd, resume, result, id, now: 1 });

describe('getTitle', () => {
  it('Takes the first non-empty line', () => {
    expect(getTitle('\n\n  Frontend Developer \nReact')).toBe('Frontend Developer');
  });

  it('He cuts the long line into 50 segments', () => {
    const title = getTitle('a'.repeat(80));
    expect(title).toHaveLength(51);
    expect(title.endsWith('…')).toBe(true);
  });

  it('It provides a default title for plain text', () => {
    expect(getTitle('   ')).toBe('Untitled check');
  });
});

describe('createEntry', () => {
  it('Scores and counts are derived from the results.', () => {
    const entry = make('Dev');
    expect(entry).toMatchObject({
      score: 70,
      matchedCount: 2,
      missingCount: 1,
      title: 'Dev',
    });
  });
});

describe('addEntry', () => {
  it('Places the new entry at the very top', () => {
    const list = addEntry([make('a')], make('b'));
    expect(list.map((e) => e.id)).toEqual(['b', 'a']);
  });

  it('A duplicate of a JD + resume cannot be created.', () => {
    const list = addEntry([make('a'), make('b')], make('a', 'r', 'a2'));
    expect(list.map((e) => e.id)).toEqual(['a2', 'b']);
  });

  it('Does not store entries beyond the maximum limit', () => {
    let list = [];
    for (let i = 0; i < 15; i++) list = addEntry(list, make(`jd${i}`));
    expect(list).toHaveLength(10);
    expect(list[0].id).toBe('jd14');
  });
});

describe('removeEntry / isSaved', () => {
  it('Removes the entry from id', () => {
    expect(removeEntry([make('a'), make('b')], 'a').map((e) => e.id)).toEqual(['b']);
  });

  it('Indicates whether the root + resume is saved or not.', () => {
    const list = [make('a', 'r')];
    expect(isSaved(list, 'a', 'r')).toBe(true);
    expect(isSaved(list, 'a', 'other')).toBe(false);
  });
});
