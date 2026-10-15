import KeywordList from './KeywordList';
import ScoreRing from './ScoreRing';

export default function Results({ result }) {
  const { score, matched, missing, extra } = result;

  return (
    <div className="grid gap-8 rounded-2xl border border-slate-200 bg-white p-6 md:grid-cols-[auto_1fr] dark:border-slate-800 dark:bg-slate-900">
      <ScoreRing score={score} />

      <div className="flex flex-col gap-6">
        <KeywordList title="Matched skills" items={matched} variant="matched" />
        <KeywordList title="Missing skills" items={missing} variant="missing" />
        <KeywordList title="Extra in your resume" items={extra} variant="extra" />
      </div>
    </div>
  );
}
