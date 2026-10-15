import { describe, it, expect } from 'vitest';
import { extractSkills } from './extractSkills';

describe('extractSkills', () => {
  it('It detects skills that contain special characters.', () => {
    const skills = extractSkills('We use Node.js, C++ and C#.');
    expect(skills.has('Node.js')).toBe(true);
    expect(skills.has('C++')).toBe(true);
    expect(skills.has('C#')).toBe(true);
  });

  it('JavaScript is not the same as Java.', () => {
    const skills = extractSkills('Strong JavaScript developer');
    expect(skills.has('JavaScript')).toBe(true);
    expect(skills.has('Java')).toBe(false);
  });

  it('I do not mistake GitHub for a Git.', () => {
    const skills = extractSkills('Projects hosted on GitHub');
    expect(skills.has('GitHub')).toBe(true);
    expect(skills.has('Git')).toBe(false);
  });

  it('Aliases are mapped within a skill.', () => {
    const skills = extractSkills('reactjs, React.js and REACT');
    expect(skills.get('React')).toBe(3);
  });

  it('It considers React Native to be distinct from React.', () => {
    const skills = extractSkills('React Native app');
    expect(skills.has('React Native')).toBe(true);
    expect(skills.has('React')).toBe(false);
  });

  it('Skills related to slash are both available.', () => {
    const skills = extractSkills('HTML/CSS');
    expect(skills.has('HTML')).toBe(true);
    expect(skills.has('CSS')).toBe(true);
  });

  it('It provides only a map, with no accompanying text.', () => {
    expect(extractSkills('').size).toBe(0);
    expect(extractSkills('   ').size).toBe(0);
  });
});
