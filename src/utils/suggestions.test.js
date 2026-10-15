import { describe, it, expect } from 'vitest';
import { getOverallAdvice, getSuggestions } from './suggestions';

describe('getSuggestions', () => {
  it('Provides a specific tip for a known skill.', () => {
    const [first] = getSuggestions([{ skill: 'TypeScript', count: 2 }]);
    expect(first.skill).toBe('TypeScript');
    expect(first.tip).toMatch(/TypeScript/);
  });

  it('Provides a default tip for an unknown skill', () => {
    const [first] = getSuggestions([{ skill: 'Svelte', count: 1 }]);
    expect(first.tip).toMatch(/Svelte/);
  });

  it('It doesnt provide an excessive number of suggestions.', () => {
    const missing = Array.from({ length: 10 }, (_, i) => ({
      skill: `Skill${i}`,
      count: 1,
    }));
    expect(getSuggestions(missing)).toHaveLength(5);
  });

  it('It returns an empty array for an empty missing list.', () => {
    expect(getSuggestions([])).toEqual([]);
  });
});

describe('getOverallAdvice', () => {
  it('Provides specific advice for each score band', () => {
    const advice = [90, 65, 45, 10].map(getOverallAdvice);
    expect(new Set(advice).size).toBe(4);
  });
});
