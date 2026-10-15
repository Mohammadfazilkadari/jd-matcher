import { Lightbulb } from 'lucide-react';
import { getOverallAdvice, getSuggestions } from '@/utils/suggestions';

export default function Suggestions({ score, missing }) {
  const suggestions = getSuggestions(missing);

  return (
    <section
      aria-label="Suggestions"
      className="rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900/50 dark:bg-amber-950/30"
    >
      <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-amber-900 dark:text-amber-200">
        <Lightbulb size={20} aria-hidden="true" />
        What should be improved?
      </h2>

      <p className="mb-4 text-sm text-amber-900/80 dark:text-amber-200/80">
        {getOverallAdvice(score)}
      </p>

      {suggestions.length > 0 && (
        <ul className="flex flex-col gap-3">
          {suggestions.map(({ skill, tip }) => (
            <li key={skill} className="text-sm text-slate-800 dark:text-slate-200">
              <strong>{skill}:</strong> {tip}
            </li>
          ))}
        </ul>
      )}

      <p className="mt-4 border-t border-amber-200 pt-3 text-xs text-amber-900/70 dark:border-amber-900/50 dark:text-amber-200/70">
        Only include skills on your resume that you actually possess.
      </p>
    </section>
  );
}
