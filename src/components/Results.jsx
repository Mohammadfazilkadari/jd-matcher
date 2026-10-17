import { Check, Save } from 'lucide-react';
import KeywordList from './KeywordList';
import ScoreRing from './ScoreRing';
import Suggestions from './Suggestions';

export default function Results({ result, onSave, saved }) {
  const { score, matched, missing, extra } = result;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onSave}
          disabled={saved}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-default disabled:bg-slate-400 dark:disabled:bg-slate-700"
        >
          {saved ? (
            <Check size={16} aria-hidden="true" />
          ) : (
            <Save size={16} aria-hidden="true" />
          )}
          {saved ? 'Saved to history' : 'Save this check'}
        </button>
      </div>

      <div className="grid gap-8 rounded-2xl border border-slate-200 bg-white p-6 md:grid-cols-[auto_1fr] dark:border-slate-800 dark:bg-slate-900">
        <ScoreRing score={score} />

        <div className="flex flex-col gap-6">
          <KeywordList title="Matched skills" items={matched} variant="matched" />
          <KeywordList title="Missing skills" items={missing} variant="missing" />
          <KeywordList title="Extra in your resume" items={extra} variant="extra" />
        </div>
      </div>

      <Suggestions score={score} missing={missing} />
    </div>
  );
}
