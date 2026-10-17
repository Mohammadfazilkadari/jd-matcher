import { useMemo } from 'react';
import { ShieldCheck } from 'lucide-react';
import History from '@/components/History';
import InputPanel from '@/components/InputPanel';
import Results from '@/components/Results';
import ThemeToggle from '@/components/ThemeToggle';
import { sampleJD, sampleResume } from '@/data/sampleData';
import { useDebounce } from '@/hooks/useDebounce';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { addEntry, createEntry, isSaved, removeEntry } from '@/utils/history';
import { matchSkills } from '@/utils/matcher';

function Message({ children }) {
  return (
    <p className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-600 dark:border-slate-700 dark:text-slate-400">
      {children}
    </p>
  );
}

function App() {
  const [jd, setJd] = useLocalStorage('jdm:jd', '');
  const [resume, setResume] = useLocalStorage('jdm:resume', '');
  const [history, setHistory] = useLocalStorage('jdm:history', []);

  // The app should not crash even if there is some incorrect data in the storage.
  const entries = Array.isArray(history) ? history : [];

  const debouncedJd = useDebounce(jd, 500);
  const debouncedResume = useDebounce(resume, 500);

  const hasInput = debouncedJd.trim() !== '' && debouncedResume.trim() !== '';
  const isPending = jd !== debouncedJd || resume !== debouncedResume;

  const result = useMemo(
    () => (hasInput ? matchSkills(debouncedJd, debouncedResume) : null),
    [hasInput, debouncedJd, debouncedResume],
  );

  const saved = hasInput && isSaved(entries, debouncedJd, debouncedResume);

  const loadSample = () => {
    setJd(sampleJD);
    setResume(sampleResume);
  };

  const clearAll = () => {
    setJd('');
    setResume('');
  };

  // Only those texts are saved whose score is visible on the screen.
  const saveCheck = () => {
    if (!result) return;
    const entry = createEntry({ jd: debouncedJd, resume: debouncedResume, result });
    setHistory((prev) => addEntry(Array.isArray(prev) ? prev : [], entry));
  };

  const loadEntry = (entry) => {
    setJd(entry.jd);
    setResume(entry.resume);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteEntry = (id) =>
    setHistory((prev) => removeEntry(Array.isArray(prev) ? prev : [], id));

  const clearHistory = () => {
    if (window.confirm('Do you want to delete all the history?')) setHistory([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6">
        <header className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl font-bold tracking-tight">JD Matcher</h1>
            <ThemeToggle />
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            Paste the job description and your resume to see which skills match and which
            ones are missing.
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
              Paste the text into both boxes, or above. <strong>Try sample</strong> Click.
            </Message>
          )}

          {result && result.totalSkills === 0 && (
            <Message>
              No non-technical skills were found in this job description. Please paste the
              entire job description (ensure the 'Requirements' section is included).
            </Message>
          )}

          {result && result.totalSkills > 0 && (
            <Results result={result} onSave={saveCheck} saved={saved} />
          )}
        </section>

        <History
          items={entries}
          onLoad={loadEntry}
          onDelete={deleteEntry}
          onClearAll={clearHistory}
        />
      </main>
    </div>
  );
}
export default App;
