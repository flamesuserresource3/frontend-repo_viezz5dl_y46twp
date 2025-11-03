import React, { useMemo, useState } from 'react';
import { Bot, Sparkles, X, ArrowRight } from 'lucide-react';

const catalog = [
  { id: 'c1', title: 'Beginner React Micro‑Course', tags: ['react', 'frontend', 'javascript', 'web'], level: 'beginner', url: '#' },
  { id: 'c2', title: 'Advanced Tailwind UI Systems', tags: ['tailwind', 'css', 'design', 'ui'], level: 'intermediate', url: '#' },
  { id: 'c3', title: 'FastAPI for Makers', tags: ['python', 'fastapi', 'api', 'backend'], level: 'intermediate', url: '#' },
  { id: 'c4', title: 'Productized AI Prompts', tags: ['ai', 'gpt', 'prompts', 'llm'], level: 'all', url: '#' },
  { id: 'c5', title: 'Indie Pricing Fundamentals', tags: ['business', 'pricing', 'indie'], level: 'all', url: '#' },
];

function recommend(query) {
  if (!query) return null;
  const q = query.toLowerCase();
  let best = null;
  let bestScore = 0;
  for (const c of catalog) {
    let score = 0;
    for (const t of c.tags) {
      if (q.includes(t)) score += 2;
    }
    if (q.includes('beginner')) score += c.level === 'beginner' ? 3 : 0;
    if (q.includes('advanced')) score += c.level === 'advanced' ? 3 : 0;
    if (q.includes('intermediate')) score += c.level === 'intermediate' ? 3 : 0;
    if (score > bestScore) { bestScore = score; best = c; }
  }
  return best || catalog[0];
}

export default function AssistantModal({ open, onClose }) {
  const [query, setQuery] = useState('');
  const rec = useMemo(() => recommend(query), [query]);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] grid place-items-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-[95vw] max-w-2xl overflow-hidden rounded-2xl border border-violet-500/30 bg-gradient-to-b from-[#160a33] to-[#0f0920] shadow-[0_20px_100px_-20px_rgba(139,92,246,0.6)]">
        <div className="flex items-center justify-between border-b border-violet-500/20 px-5 py-4">
          <div className="flex items-center gap-2 text-sm text-violet-200/80"><Bot size={18} /> Course assistant</div>
          <button onClick={onClose} className="rounded-md p-2 text-violet-200 hover:bg-white/5"><X size={18} /></button>
        </div>
        <div className="p-5">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe what you want to learn..."
            className="w-full rounded-md border border-violet-500/30 bg-[#120a28] px-4 py-3 text-sm text-white placeholder-violet-300/40 outline-none ring-violet-400/30 focus:ring"
          />
          <button onClick={() => setQuery(query.trim())} className="mt-3 inline-flex items-center gap-2 rounded-md bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow shadow-violet-600/30 transition hover:bg-violet-500">
            <Sparkles size={16} /> Recommend
          </button>

          {rec && query && (
            <div className="mt-5 rounded-xl border border-violet-500/20 bg-[#0d081f] p-4">
              <div className="text-xs uppercase tracking-wide text-violet-300/70">Suggested course</div>
              <div className="mt-1 text-lg font-semibold">{rec.title}</div>
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-violet-300/80">
                {rec.tags.map((t) => (
                  <span key={t} className="rounded-md border border-violet-500/20 bg-[#0d081f] px-2 py-1">{t}</span>
                ))}
              </div>
              <a href={rec.url} className="mt-4 inline-flex items-center gap-2 rounded-md border border-violet-400/30 bg-white/5 px-4 py-2 text-sm text-violet-200 transition hover:bg-white/10">
                Explore <ArrowRight size={16} />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
