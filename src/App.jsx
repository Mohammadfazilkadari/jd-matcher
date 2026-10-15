import KeywordList from '@/components/KeywordList';
import ScoreRing from '@/components/ScoreRing';
import { matchSkills } from '@/utils/matcher';

const jd = 'React, Tailwind, TypeScript, REST API, Git, Docker, Jest, React';
const resume = 'I build apps with reactjs, tailwindcss, JavaScript, git and Vite';

function App() {
  const { score, matched, missing, extra } = matchSkills(jd, resume);

  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-8 p-6">
      <ScoreRing score={score} />
      <KeywordList title="Matched skills" items={matched} variant="matched" />
      <KeywordList title="Missing skills" items={missing} variant="missing" />
      <KeywordList title="Extra in resume" items={extra} variant="extra" />
    </main>
  );
}

export default App;
