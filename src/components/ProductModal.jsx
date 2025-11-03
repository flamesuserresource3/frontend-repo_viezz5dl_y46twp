import React from 'react';
import { X, Star, Heart, ShoppingCart, BadgeCheck } from 'lucide-react';

function Stars({ value }) {
  const full = Math.round(value || 0);
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < full ? 'text-yellow-400' : 'text-violet-300/40'}
          fill={i < full ? 'currentColor' : 'none'}
        />
      ))}
    </div>
  );
}

export default function ProductModal({ open, onClose, product, onAddToCart, onToggleFavorite, isFav, inCart, isOwner, onMarkSold }) {
  if (!open || !product) return null;
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-[95vw] max-w-3xl overflow-hidden rounded-2xl border border-violet-500/30 bg-gradient-to-b from-[#160a33] to-[#0f0920] shadow-[0_20px_100px_-20px_rgba(139,92,246,0.5)]">
        <div className="flex items-center justify-between border-b border-violet-500/20 px-5 py-4">
          <div className="flex items-center gap-2 text-sm text-violet-200/80">
            <BadgeCheck size={16} className="text-violet-400" /> Product details
          </div>
          <button onClick={onClose} className="rounded-md p-2 text-violet-200 hover:bg-white/5"><X size={18} /></button>
        </div>
        <div className="grid grid-cols-1 gap-6 p-5 md:grid-cols-2">
          <div className="overflow-hidden rounded-xl">
            <img src={product.photo} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">{product.name}</h3>
            <div className="mt-1 flex items-center gap-2 text-sm text-violet-300/80">
              <Stars value={product.rating} />
              <span>({product.reviewsCount} reviews)</span>
            </div>
            <p className="mt-3 text-sm text-violet-200/80">{product.longDescription || product.description}</p>

            <div className="mt-4 rounded-lg border border-violet-500/20 bg-[#0d081f] p-3 text-sm">
              <div className="text-violet-300/70">By {product.authorName}</div>
              <div className="mt-1 flex items-center gap-2 text-violet-200/80">
                <Stars value={product.authorRating} />
                <span className="text-xs">Creator rating</span>
              </div>
            </div>

            <ul className="mt-3 flex flex-wrap gap-2">
              {product.characteristics.map((c, i) => (
                <li key={i} className="rounded-md border border-violet-500/20 bg-[#0d081f] px-2 py-1 text-[11px] text-violet-200/90">{c}</li>
              ))}
            </ul>

            <div className="mt-5 flex items-center justify-between">
              <div className="text-lg font-semibold text-white">${product.price.toFixed(2)}</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); onToggleFavorite(product); }}
                  className={`inline-flex items-center justify-center rounded-md border border-violet-500/20 bg-[#120a28] p-2 transition ${isFav ? 'text-red-500' : 'text-violet-200 hover:bg-white/10'}`}
                  aria-label="Favorite"
                >
                  <Heart size={16} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                  className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white shadow transition ${inCart ? 'bg-emerald-600 shadow-emerald-600/30' : 'bg-violet-600 shadow-violet-600/30 hover:bg-violet-500'}`}
                >
                  <ShoppingCart size={16} /> {inCart ? 'Added' : 'Add to cart'}
                </button>
                {isOwner && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onMarkSold(product.id); }}
                    className="inline-flex items-center gap-2 rounded-md border border-emerald-400/30 bg-emerald-500/20 px-3 py-2 text-xs font-medium text-emerald-200 transition hover:bg-emerald-500/30"
                  >
                    Mark sold
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
