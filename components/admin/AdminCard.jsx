export function AdminCard({ children, className = '' }) {
  return (
    <div className={`glass rounded-2xl p-6 border border-white/10 ${className}`}>
      {children}
    </div>
  );
}

export function AdminSection({ title, description, children, action }) {
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-white font-bold text-lg leading-tight">{title}</h2>
          {description && (
            <p className="text-slate-400 text-sm mt-1">{description}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      {children}
    </div>
  );
}

export function FormField({ label, required, children, hint }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-300">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-slate-500 text-xs">{hint}</p>}
    </div>
  );
}

export const inputClass =
  'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/60 focus:bg-white/[0.07] transition-colors';

export const textareaClass =
  `${inputClass} resize-none`;

export const selectClass =
  'w-full bg-[#0d0b1e] border border-white/10 rounded-xl px-4 py-3 text-slate-300 text-sm focus:outline-none focus:border-violet-500/60 transition-colors';
