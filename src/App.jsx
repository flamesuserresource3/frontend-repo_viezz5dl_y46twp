import React, { useMemo, useState } from 'react';
import Hero3D from './components/Hero3D';
import AccountPanel from './components/AccountPanel';
import ProductGrid from './components/ProductGrid';
import AssistantPanel from './components/AssistantPanel';
import ProductModal from './components/ProductModal';
import AuthModal from './components/AuthModal';
import AssistantModal from './components/AssistantModal';
import { Bot } from 'lucide-react';

const initialProducts = [
  {
    id: 'p1',
    name: 'AI Tweet Engine Presets',
    photo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop',
    characteristics: ['JSON', 'Prompt kit', 'Twitter'],
    description: 'Curated prompt presets that turn threads into growth engines. Plug‑and‑play JSON packs.',
    longDescription: 'A comprehensive collection of optimized prompt presets for high‑engagement Twitter threads. Includes use‑cases, tone toggles, and growth frameworks ready to paste into your tooling.',
    price: 19,
    ownerId: 'creator@synth.io',
    authorName: 'Nova Blake',
    authorRating: 5,
    rating: 4,
    reviewsCount: 112,
    soldCount: 42,
  },
  {
    id: 'p2',
    name: 'Gradient UI Pack (Figma)',
    photo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600&auto=format&fit=crop',
    characteristics: ['Figma', 'UI kit', 'Gradients'],
    description: 'Futuristic purple/blue palette with 120 components and states. Perfect for landing pages.',
    longDescription: 'A Figma system designed for modern fintech and AI products. Layered components, tokenized colors, auto layout templates, and polished examples to speed up your workflow.',
    price: 29,
    ownerId: 'design@violet.studio',
    authorName: 'Cass Vega',
    authorRating: 5,
    rating: 5,
    reviewsCount: 257,
    soldCount: 65,
  },
  {
    id: 'p3',
    name: 'FastAPI Boilerplate',
    photo: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=1600&auto=format&fit=crop',
    characteristics: ['Python', 'FastAPI', 'Auth'],
    description: 'Production‑ready FastAPI template with JWT auth, users, and Stripe skeleton.',
    longDescription: 'Batteries‑included backend boilerplate: auth flows, database wiring, structured settings, and patterns for clean APIs. Ideal for launching MVPs rapidly.',
    price: 39,
    ownerId: 'dev@backend.pro',
    authorName: 'Riley Kai',
    authorRating: 4,
    rating: 4,
    reviewsCount: 89,
    soldCount: 18,
  },
  {
    id: 'p4',
    name: 'Motion Micro‑Course',
    photo: 'https://images.unsplash.com/photo-1501751542211-3a9f2a1217b1?q=80&w=1600&auto=format&fit=crop',
    characteristics: ['Framer Motion', 'Animation', 'React'],
    description: 'Short, targeted lessons to master delightful micro‑interactions in React.',
    longDescription: 'Hands‑on mini lessons with practical challenges and copy‑paste snippets. Build smooth animations and micro‑interactions that feel premium.',
    price: 24,
    ownerId: 'creator@synth.io',
    authorName: 'Nova Blake',
    authorRating: 5,
    rating: 4,
    reviewsCount: 133,
    soldCount: 31,
  },
  {
    id: 'p5',
    name: 'Tailwind e‑Commerce Blocks',
    photo: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?q=80&w=1600&auto=format&fit=crop',
    characteristics: ['Tailwind', 'Components', 'Shop'],
    description: 'Composable, accessible blocks for carts, checkouts and product cards in Tailwind.',
    longDescription: 'Production‑ready UI blocks with accessibility baked in. Mix and match to assemble complete e‑commerce flows faster.',
    price: 22,
    ownerId: 'design@violet.studio',
    authorName: 'Cass Vega',
    authorRating: 5,
    rating: 5,
    reviewsCount: 201,
    soldCount: 54,
  },
  {
    id: 'p6',
    name: 'Indie Pricing Cheatsheet',
    photo: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop',
    characteristics: ['Pricing', 'SaaS', 'Strategy'],
    description: 'No‑nonsense pricing patterns that help solo makers and small teams monetize quickly.',
    longDescription: 'A concise guide with proven pricing frameworks, psychological triggers, and templates for tiers and bundling.',
    price: 14,
    ownerId: 'biz@playbook.io',
    authorName: 'Drew Sol',
    authorRating: 4,
    rating: 4,
    reviewsCount: 67,
    soldCount: 12,
  },
];

export default function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activeProduct, setActiveProduct] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);

  const onLogin = (u) => setUser(u);
  const onLogout = () => setUser(null);

  const requireAuth = () => {
    if (!user) { setShowAuth(true); return true; }
    return false;
  };

  const onAddToCart = (product) => {
    if (requireAuth()) return;
    setCart((prev) => (prev.find((p) => p.id === product.id) ? prev : [...prev, product]));
  };

  const onRemoveFromCart = (id) => setCart((prev) => prev.filter((p) => p.id !== id));

  const onToggleFavorite = (product) => {
    if (requireAuth()) return;
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
            <div className="text-lg font-semibold">Agnostick</div>
          </div>
          <div className="flex items-center gap-3 text-sm text-violet-200/80">
            <button onClick={() => setShowAssistant(true)} className="inline-flex items-center gap-2 rounded-md border border-violet-400/30 bg-white/5 px-3 py-2 text-violet-200 transition hover:bg-white/10"><Bot size={16} /> Ask AI</button>
            <div>Cart: {cart.length} • Favorites: {favorites.length} • Total: ${cartTotal.toFixed(2)}</div>
          </div>
        </div>
      </header>

      <main>
        <Hero3D />
        <ProductGrid
          products={products}
          user={user}
          favorites={favorites}
          cart={cart}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
          onMarkSold={onMarkSold}
          onOpenProduct={setActiveProduct}
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

      {/* Floating AI button for mobile quick access */}
      <button
        onClick={() => setShowAssistant(true)}
        className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2 rounded-full bg-violet-600 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-violet-600/40 transition hover:bg-violet-500 md:hidden"
      >
        <Bot size={16} /> Ask AI
      </button>

      <ProductModal
        open={!!activeProduct}
        onClose={() => setActiveProduct(null)}
        product={activeProduct}
        onAddToCart={onAddToCart}
        onToggleFavorite={onToggleFavorite}
        isFav={activeProduct ? favorites.some(f => f.id === activeProduct.id) : false}
        inCart={activeProduct ? cart.some(c => c.id === activeProduct.id) : false}
        isOwner={user && activeProduct ? (user.role === 'seller' && user.id === activeProduct.ownerId) : false}
        onMarkSold={onMarkSold}
      />

      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} onLogin={onLogin} />
      <AssistantModal open={showAssistant} onClose={() => setShowAssistant(false)} />

      <footer className="mt-16 border-t border-violet-500/20 bg-[#0b0615] px-6 py-10 text-sm text-violet-300/70">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
            <div>© {new Date().getFullYear()} Agnostick — Micro‑products for creators.</div>
            <div className="text-violet-300/60">Focused learning. One problem, one course.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
