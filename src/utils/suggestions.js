import { defaultTip, skillTips } from '@/data/skillTips';

const MAX_SUGGESTIONS = 5;

/**
 * The 'top tips' are derived from the missing skills (which are already sorted by order of importance).
 * @param {{skill: string, count: number}[]} missing
 */
export function getSuggestions(missing, limit = MAX_SUGGESTIONS) {
  return missing.slice(0, limit).map(({ skill, count }) => ({
    skill,
    count,
    tip: skillTips[skill] ?? defaultTip(skill),
  }));
}

// Overall advice in one line, based on the score
export function getOverallAdvice(score) {
  if (score >= 80)
    return 'The resume aligns well with this role. Now, for each skill, include a corresponding project or achievement.';
  if (score >= 60)
    return 'You have a good foundation. Clearly highlight the skills you possess—from among those listed as missing—on your resume.';
  if (score >= 40)
    return 'There are some gaps. First, look at the skills that have consistently appeared in the JD.';
  return 'These roles are currently a stretch. Learn the top 2–3 missing skills, build a project, and then apply again.';
}
