import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket } from 'lucide-react';

export default function Hero3D() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden bg-gradient-to-b from-[#0b0615] via-[#0b0615] to-[#120a28] text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-6 py-16 md:flex-row md:py-24">
        <div className="z-10 w-full md:w-1/2">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs text-violet-300 backdrop-blur">
            <Rocket size={14} />
            Micro‑product marketplace
          </div>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
            Discover bold digital micro‑products
          </h1>
          <p className="mt-4 max-w-xl text-violet-200/80">
            Shop and sell bite‑sized templates, presets, snippets and mini‑courses. Crafted for creators. Powered by a futuristic, interactive 3D experience.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#products" className="rounded-lg bg-violet-600 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-violet-600/30 transition hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400">
              Browse products
            </a>
            <a href="#account" className="rounded-lg border border-violet-400/30 bg-white/5 px-5 py-3 text-sm font-medium text-violet-200 backdrop-blur transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-violet-400">
              Become a seller
            </a>
          </div>
        </div>
        <div className="relative mt-12 h-[420px] w-full md:mt-0 md:h-[520px] md:w-1/2">
          {/* Spline scene */}
          <div className="absolute inset-0">
            <Spline scene="https://prod.spline.design/wwTRdG1D9CkNs368/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          </div>
          {/* Subtle gradient glow that does not block interaction */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_20%,rgba(139,92,246,0.25),transparent)]" />
        </div>
      </div>
    </section>
  );
}
