import React from 'react';
import { Heart, ShoppingCart, BadgeCheck, Star, Check } from 'lucide-react';
import { motion } from 'framer-motion';

function Stars({ value, small = false }) {
  const full = Math.round(value || 0);
  const size = small ? 14 : 16;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} className={i < full ? 'text-yellow-400' : 'text-violet-300/40'} fill={i < full ? 'currentColor' : 'none'} />
      ))}
    </div>
  );
}

export default function ProductGrid({ products, user, onAddToCart, onToggleFavorite, favorites, onMarkSold, onOpenProduct, cart }) {
  return (
    <section id="products" className="relative w-full bg-[#0e0821] px-6 py-12 text-white">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Trending micro‑products</h2>
            <p className="mt-1 text-sm text-violet-200/70">Curated digital goods in a unified, futuristic style.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => {
            const isFav = favorites.some(f => f.id === p.id);
            const isOwner = user && user.role === 'seller' && user.id === p.ownerId;
            const inCart = cart.some(c => c.id === p.id);
            return (
              <motion.div
                key={p.id}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onClick={() => onOpenProduct(p)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-b from-[#160a33] to-[#0f0920] p-4 shadow-[0_10px_40px_-10px_rgba(139,92,246,0.4)]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
                  <img src={p.photo} alt={p.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_20%,rgba(124,58,237,0.18),transparent)]" />
                  {isOwner && (
                    <div className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-violet-600 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                      <BadgeCheck size={12} /> Your product
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-white">{p.name}</h3>
                    <div className="rounded-md bg-white/10 px-2 py-1 text-sm text-violet-200">${p.price.toFixed(2)}</div>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-violet-300/80">
                      <Stars value={p.rating} small />
                      <span>({p.reviewsCount})</span>
                    </div>
                    <div className="text-xs text-violet-300/70">Sold: {p.soldCount || 0}</div>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-violet-200/80">{p.description}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {p.characteristics.map((c, i) => (
                      <li key={i} className="rounded-md border border-violet-500/20 bg-[#0d081f] px-2 py-1 text-[11px] text-violet-200/90">{c}</li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onToggleFavorite(p)}
                        aria-label="Favorite"
                        className={`inline-flex items-center justify-center rounded-md border border-violet-500/20 bg-[#120a28] p-2 transition ${isFav ? 'text-red-500' : 'text-violet-200 hover:bg-white/10'}`}
                      >
                        <Heart size={16} />
                      </button>
                      <button
                        onClick={() => onAddToCart(p)}
                        className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white shadow transition ${inCart ? 'bg-emerald-600 shadow-emerald-600/30' : 'bg-violet-600 shadow-violet-600/30 hover:bg-violet-500'}`}
                      >
                        {inCart ? (<><Check size={16} /> Added</>) : (<><ShoppingCart size={16} /> Add</>)}
                      </button>
                    </div>
                    {isOwner && (
                      <button
                        onClick={() => onMarkSold(p.id)}
                        className="inline-flex items-center gap-2 rounded-md border border-emerald-400/30 bg-emerald-500/20 px-3 py-2 text-xs font-medium text-emerald-200 transition hover:bg-emerald-500/30"
                      >
                        Mark sold
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
