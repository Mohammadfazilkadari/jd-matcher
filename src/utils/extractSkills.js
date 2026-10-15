import skillsDictionary from '@/data/skillsDictionary';
import { normalize } from './normalize';

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const cache = new WeakMap();

function buildMatcher(dictionary) {
  const aliasToSkill = new Map();
  for (const [skill, aliases] of Object.entries(dictionary)) {
    for (const alias of [skill, ...aliases]) {
      aliasToSkill.set(normalize(alias), skill);
    }
  }

  const pattern = [...aliasToSkill.keys()]
    .sort((a, b) => b.length - a.length)
    .map(escapeRegex)
    .join('|');

  const regex = new RegExp(`(?<![a-z0-9])(?:${pattern})(?![a-z0-9+#])`, 'g');

  return { regex, aliasToSkill };
}

function getMatcher(dictionary) {
  if (!cache.has(dictionary)) cache.set(dictionary, buildMatcher(dictionary));
  return cache.get(dictionary);
}

export function extractSkills(text, dictionary = skillsDictionary) {
  const result = new Map();
  if (!text || !text.trim()) return result;

  const { regex, aliasToSkill } = getMatcher(dictionary);

  for (const match of normalize(text).matchAll(regex)) {
    const skill = aliasToSkill.get(match[0]);
    result.set(skill, (result.get(skill) ?? 0) + 1);
  }
  return result;
}
