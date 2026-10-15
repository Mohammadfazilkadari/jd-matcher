import skillsDictionary from '@/data/skillsDictionary';
import { extractSkills } from './extractSkills';

// Even if a skill appears 10 times in a set, its weight will be at most 3.
// A single skill will come to dominate the entire score.
const MAX_WEIGHT = 3;
const weightOf = (count) => Math.min(count, MAX_WEIGHT);

// Higher frequency = higher importance. In case of a tie, sort alphabetically by name.
const byImportance = (a, b) => b.count - a.count || a.skill.localeCompare(b.skill);

/**
 * Compare skills of JD and resume.
 * @returns {{
 *   score: number,                              // 0-100
 *   matched: {skill: string, count: number}[],  // In the JD, in the resume too
 *   missing: {skill: string, count: number}[],  // In the JD, but not in the resume
 *   extra: string[],                            // In the resume, but not in the JD
 *   totalSkills: number                         // How many skills were acquired in the JD?
 * }}
 */
export function matchSkills(jdText, resumeText, dictionary = skillsDictionary) {
  const jdSkills = extractSkills(jdText, dictionary);
  const resumeSkills = extractSkills(resumeText, dictionary);

  const matched = [];
  const missing = [];
  let totalWeight = 0;
  let earnedWeight = 0;

  for (const [skill, count] of jdSkills) {
    const weight = weightOf(count);
    totalWeight += weight;

    if (resumeSkills.has(skill)) {
      matched.push({ skill, count });
      earnedWeight += weight;
    } else {
      missing.push({ skill, count });
    }
  }

  matched.sort(byImportance);
  missing.sort(byImportance);

  const extra = [...resumeSkills.keys()].filter((s) => !jdSkills.has(s)).sort();

  // If no skill is found in the JD, the value is 0 (do not divide by zero).
  const score = totalWeight ? Math.round((earnedWeight / totalWeight) * 100) : 0;

  return { score, matched, missing, extra, totalSkills: jdSkills.size };
}

// Labels by score, to appear below the scoring in the UI
export function getScoreLabel(score) {
  if (score >= 80) return 'Strong match';
  if (score >= 60) return 'Good match';
  if (score >= 40) return 'Needs work';
  return 'Weak match';
}
