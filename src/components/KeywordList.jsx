import clsx from 'clsx';
import { Check, Minus, X } from 'lucide-react';

const VARIANTS = {
  matched: {
    icon: Check,
    chip: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
    empty: 'No skills matched yet.',
  },
  missing: {
    icon: X,
    chip: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
    empty: 'No skills are missing. Great!',
  },
  extra: {
    icon: Minus,
    chip: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    empty: 'No extra skills were found in the resume.',
  },
};

// items: [{ skill, count }] or ['React', 'Vue.js'] (Both are leaving.)
export default function KeywordList({ title, items, variant }) {
  const { icon: Icon, chip, empty } = VARIANTS[variant];

  return (
    <section>
      <h3 className="mb-3 text-sm font-semibold text-slate-600 dark:text-slate-400">
        {title} <span className="font-normal">({items.length})</span>
      </h3>

      {items.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">{empty}</p>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {items.map((item) => {
            const name = typeof item === 'string' ? item : item.skill;
            const count = typeof item === 'string' ? 0 : item.count;
            return (
              <li
                key={name}
                className={clsx(
                  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium',
                  chip,
                )}
              >
                <Icon size={14} aria-hidden="true" />
                {name}
                {count > 1 && <span className="text-xs opacity-70">×{count}</span>}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
