import React, { useMemo, useState } from 'react';
import Hero3D from './components/Hero3D';
import AccountPanel from './components/AccountPanel';
import ProductGrid from './components/ProductGrid';
import AssistantPanel from './components/AssistantPanel';

// Demo catalog data (front-end only for now). In production, wire to backend APIs.
const initialProducts = [
  {
    id: 'p1',
    name: 'AI Tweet Engine Presets',
    photo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop',
    characteristics: ['JSON', 'Prompt kit', 'Twitter'],
    description: 'Curated prompt presets that turn threads into growth engines. Plug‑and‑play JSON packs.',
    price: 19,
    ownerId: 'creator@synth.io',
    soldCount: 42,
  },
  {
    id: 'p2',
    name: 'Gradient UI Pack (Figma)',
    photo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600&auto=format&fit=crop',
    characteristics: ['Figma', 'UI kit', 'Gradients'],
    description: 'Futuristic purple/blue palette with 120 components and states. Perfect for landing pages.',
    price: 29,
    ownerId: 'design@violet.studio',
    soldCount: 65,
  },
  {
    id: 'p3',
    name: 'FastAPI Boilerplate',
    photo: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=1600&auto=format&fit=crop',
    characteristics: ['Python', 'FastAPI', 'Auth'],
    description: 'Production‑ready FastAPI template with JWT auth, users, and Stripe skeleton.',
    price: 39,
    ownerId: 'dev@backend.pro',
    soldCount: 18,
  },
  {
    id: 'p4',
    name: 'Motion Micro‑Course',
    photo: 'https://images.unsplash.com/photo-1501751542211-3a9f2a1217b1?q=80&w=1600&auto=format&fit=crop',
    characteristics: ['Framer Motion', 'Animation', 'React'],
    description: 'Short, targeted lessons to master delightful micro‑interactions in React.',
    price: 24,
    ownerId: 'creator@synth.io',
    soldCount: 31,
  },
  {
    id: 'p5',
    name: 'Tailwind e‑Commerce Blocks',
    photo: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?q=80&w=1600&auto=format&fit=crop',
    characteristics: ['Tailwind', 'Components', 'Shop'],
    description: 'Composable, accessible blocks for carts, checkouts and product cards in Tailwind.',
    price: 22,
    ownerId: 'design@violet.studio',
    soldCount: 54,
  },
  {
    id: 'p6',
    name: 'Indie Pricing Cheatsheet',
    photo: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop',
    characteristics: ['Pricing', 'SaaS', 'Strategy'],
    description: 'No‑nonsense pricing patterns that help solo makers and small teams monetize quickly.',
    price: 14,
    ownerId: 'biz@playbook.io',
    soldCount: 12,
  },
];

export default function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const onLogin = (u) => setUser(u);
  const onLogout = () => setUser(null);

  const onAddToCart = (product) => {
    setCart((prev) => (prev.find((p) => p.id === product.id) ? prev : [...prev, product]));
  };

  const onRemoveFromCart = (id) => setCart((prev) => prev.filter((p) => p.id !== id));

  const onToggleFavorite = (product) => {
    setFavorites((prev) => (prev.find((p) => p.id === product.id) ? prev.filter((p) => p.id !== product.id) : [...prev, product]));
  };

  const onMarkSold = (id) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, soldCount: (p.soldCount || 0) + 1 } : p)));
  };

  const cartTotal = useMemo(() => cart.reduce((s, p) => s + p.price, 0), [cart]);

  return (
    <div className="min-h-screen w-full bg-[#0b0615] font-inter text-white">
      <header className="sticky top-0 z-50 w-full border-b border-violet-500/20 bg-[#0b0615]/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600" />
            <div className="text-lg font-semibold">Violet Market</div>
          </div>
          <div className="text-sm text-violet-200/80">Cart: {cart.length} • Favorites: {favorites.length} • Total: ${cartTotal.toFixed(2)}</div>
        </div>
      </header>

      <main>
        <Hero3D />
        <ProductGrid
          products={products}
          user={user}
          favorites={favorites}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
          onMarkSold={onMarkSold}
        />
        <AccountPanel
          user={user}
          onLogin={onLogin}
          onLogout={onLogout}
          cart={cart}
          favorites={favorites}
          products={products}
          onRemoveFromCart={onRemoveFromCart}
        />
        <AssistantPanel />
      </main>

      <footer className="mt-16 border-t border-violet-500/20 bg-[#0b0615] px-6 py-10 text-sm text-violet-300/70">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
            <div>© {new Date().getFullYear()} Violet Market — Micro‑products for creators.</div>
            <div className="text-violet-300/60">Built with an interactive 3D hero in purple tones.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
