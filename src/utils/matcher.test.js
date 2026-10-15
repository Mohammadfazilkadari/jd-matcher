import { describe, it, expect } from 'vitest';
import { matchSkills, getScoreLabel } from './matcher';

describe('matchSkills', () => {
  it('If all skills match, it gives 100 (With aliases)', () => {
    const result = matchSkills('React and Tailwind', 'reactjs, tailwindcss');
    expect(result.score).toBe(100);
    expect(result.missing).toHaveLength(0);
  });

  it('If there is no skill match, it returns 0', () => {
    const result = matchSkills('React and Docker', 'Python and Django');
    expect(result.score).toBe(0);
    expect(result.matched).toHaveLength(0);
  });

  it('A weighted score is calculated based on frequency', () => {
    // React 2 baar (weight 2), Git 1 baar (weight 1). Resume me sirf React: 2/3
    const result = matchSkills('React React Git', 'I know React');
    expect(result.score).toBe(67);
  });

  it('The weight of a skill is capped at 3', () => {
    // React 10 baar (cap: 3) + Git 1 baar (1). Resume me sirf Git: 1/4
    const result = matchSkills('React '.repeat(10) + 'Git', 'Git');
    expect(result.score).toBe(25);
  });

  it('Missing skills that are more important take priority', () => {
    const result = matchSkills('Docker Docker Git', '');
    expect(result.missing.map((m) => m.skill)).toEqual(['Docker', 'Git']);
  });

  it('The extra skills section of a resume highlights additional capabilities', () => {
    const result = matchSkills('React', 'React and Vue');
    expect(result.extra).toEqual(['Vue.js']);
  });

  it('If no skill is found in the JD, the score is 0 and total skills are 0.', () => {
    const result = matchSkills('We are a friendly team', 'React');
    expect(result.score).toBe(0);
    expect(result.totalSkills).toBe(0);
  });

  it('Empty input does not cause a crash.', () => {
    expect(matchSkills('', '').score).toBe(0);
  });
});

describe('getScoreLabel', () => {
  it('Assigns the correct label based on the score', () => {
    expect(getScoreLabel(90)).toBe('Strong match');
    expect(getScoreLabel(65)).toBe('Good match');
    expect(getScoreLabel(45)).toBe('Needs work');
    expect(getScoreLabel(10)).toBe('Weak match');
  });
});
