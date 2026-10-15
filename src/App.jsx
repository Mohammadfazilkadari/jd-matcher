import { useMemo } from 'react';
import { ShieldCheck } from 'lucide-react';
import InputPanel from '@/components/InputPanel';
import Results from '@/components/Results';
import { sampleJD, sampleResume } from '@/data/sampleData';
import { useDebounce } from '@/hooks/useDebounce';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { matchSkills } from '@/utils/matcher';

function Message({ children }) {
  return (
    <p className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-600 dark:border-slate-700 dark:text-slate-400">
      {children}
    </p>
  );
}

function App() {
  // Inputs are saved in LocalStorage; they do not disappear upon refresh.
  const [jd, setJd] = useLocalStorage('jdm:jd', '');
  const [resume, setResume] = useLocalStorage('jdm:resume', '');

  // Matching will run 500ms after typing stops.
  const debouncedJd = useDebounce(jd, 500);
  const debouncedResume = useDebounce(resume, 500);

  const hasInput = debouncedJd.trim() !== '' && debouncedResume.trim() !== '';
  const isPending = jd !== debouncedJd || resume !== debouncedResume;

  // Recalculate only when the debonded input changes.
  const result = useMemo(
    () => (hasInput ? matchSkills(debouncedJd, debouncedResume) : null),
    [hasInput, debouncedJd, debouncedResume],
  );

  const loadSample = () => {
    setJd(sampleJD);
    setResume(sampleResume);
  };

  const clearAll = () => {
    setJd('');
    setResume('');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">JD Matcher</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Paste the job description and resume, see what skills match and Which ones are
            missing?
          </p>
          <p className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <ShieldCheck size={14} aria-hidden="true" />
            Your data stays only in your browser. It is not uploaded anywhere.
          </p>
        </header>

        <InputPanel
          jd={jd}
          resume={resume}
          onJdChange={setJd}
          onResumeChange={setResume}
          onLoadSample={loadSample}
          onClear={clearAll}
        />

        <section
          aria-live="polite"
          aria-label="Results"
          className={isPending ? 'opacity-60 transition-opacity' : 'transition-opacity'}
        >
          {!result && (
            <Message>
              Paste the text into both boxes, or above. <strong>Try sample</strong> click.
            </Message>
          )}

          {result && result.totalSkills === 0 && (
            <Message>
              No non-technical skills were found in this job description. Please paste the
              entire job description (ensure the 'Requirements' section is included).
            </Message>
          )}

          {result && result.totalSkills > 0 && <Results result={result} />}
        </section>
      </main>
    </div>
  );
}
export default App;
