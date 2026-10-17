import clsx from 'clsx';
import { Clock, RotateCcw, Trash2 } from 'lucide-react';

const dateFormat = new Intl.DateTimeFormat(undefined, {
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
});

// All the class names have been written out so that Tailwind can detect them.
function badgeClass(score) {
  if (score >= 80)
    return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300';
  if (score >= 60)
    return 'bg-lime-100 text-lime-800 dark:bg-lime-900/40 dark:text-lime-300';
  if (score >= 40)
    return 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300';
  return 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300';
}

const iconButton =
  'inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800';

export default function History({ items, onLoad, onDelete, onClearAll }) {
  if (items.length === 0) return null;

  return (
    <section
      aria-label="History"
      className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Clock size={20} aria-hidden="true" />
          History{' '}
          <span className="text-sm font-normal text-slate-500">({items.length})</span>
        </h2>
        <button type="button" onClick={onClearAll} className={iconButton}>
          Clear all
        </button>
      </div>

      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 p-3 dark:border-slate-800"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span
                className={clsx(
                  'rounded-full px-3 py-1 text-sm font-semibold tabular-nums',
                  badgeClass(item.score),
                )}
              >
                {item.score}%
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{item.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {dateFormat.format(item.createdAt)} · {item.matchedCount} matched ·{' '}
                  {item.missingCount} missing
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onLoad(item)}
                aria-label={`Load check: ${item.title}`}
                className={iconButton}
              >
                <RotateCcw size={14} aria-hidden="true" />
                Load
              </button>
              <button
                type="button"
                onClick={() => onDelete(item.id)}
                aria-label={`Delete check: ${item.title}`}
                className={iconButton}
              >
                <Trash2 size={14} aria-hidden="true" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
        History is saved only in this browser. If you are using a shared computer, select
        'Clear all'.
      </p>
    </section>
  );
}
