import { Briefcase, FileText, Sparkles, Trash2 } from 'lucide-react';

const MAX_CHARS = 10000;

function Field({ id, label, icon: Icon, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300"
      >
        <Icon size={16} aria-hidden="true" />
        {label}
      </label>

      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={MAX_CHARS}
        rows={12}
        placeholder={placeholder}
        className="w-full resize-y rounded-xl border border-slate-300 bg-white p-4 text-sm leading-relaxed text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      />

      <p className="text-right text-xs text-slate-500 tabular-nums dark:text-slate-400">
        {value.length.toLocaleString()} / {MAX_CHARS.toLocaleString()}
      </p>
    </div>
  );
}

export default function InputPanel({
  jd,
  resume,
  onJdChange,
  onResumeChange,
  onLoadSample,
  onClear,
}) {
  const hasContent = jd.length > 0 || resume.length > 0;

  return (
    <section aria-label="Inputs" className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onLoadSample}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <Sparkles size={16} aria-hidden="true" />
          Try sample
        </button>

        <button
          type="button"
          onClick={onClear}
          disabled={!hasContent}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <Trash2 size={16} aria-hidden="true" />
          Clear
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Field
          id="jd"
          label="Job description"
          icon={Briefcase}
          value={jd}
          onChange={onJdChange}
          placeholder="Paste the job description here..."
        />
        <Field
          id="resume"
          label="Your resume"
          icon={FileText}
          value={resume}
          onChange={onResumeChange}
          placeholder="Paste the text of your resume here..."
        />
      </div>
    </section>
  );
}
