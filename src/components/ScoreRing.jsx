import clsx from 'clsx';
import { getScoreLabel } from '@/utils/matcher';

const SIZE = 160;
const STROKE = 12;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// The full class names are written out (not as dynamic strings), but Tailwind fails to detect them.
function getColor(score) {
  if (score >= 80) return 'text-emerald-500';
  if (score >= 60) return 'text-lime-500';
  if (score >= 40) return 'text-amber-500';
  return 'text-rose-500';
}

export default function ScoreRing({ score }) {
  const safeScore = Math.min(100, Math.max(0, score));
  const offset = CIRCUMFERENCE * (1 - safeScore / 100);
  const label = getScoreLabel(safeScore);

  return (
    <div
      role="img"
      aria-label={`Match score ${safeScore} percent, ${label}`}
      className="flex flex-col items-center gap-3"
    >
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className={clsx('-rotate-90', getColor(safeScore))}
        >
          {/* Track (The grey ring at the back) */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            strokeWidth={STROKE}
            className="stroke-slate-200 dark:stroke-slate-700"
          />
          {/* The animation restarts when 'progress' changes. */}
          <circle
            key={safeScore}
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            className="ring-progress"
            style={{ '--circ': CIRCUMFERENCE }}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold tabular-nums">{safeScore}%</span>
        </div>
      </div>

      <p className={clsx('text-lg font-semibold', getColor(safeScore))}>{label}</p>
    </div>
  );
}
