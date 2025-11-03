import React, { useMemo, useState } from 'react';
import { User, LogOut, ShoppingCart, Heart, DollarSign, Shield } from 'lucide-react';

export default function AccountPanel({ user, onLogin, onLogout, cart, favorites, products, onRemoveFromCart }) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [activeTab, setActiveTab] = useState('cart');

  const earnings = useMemo(() => {
    if (!user || user.role !== 'seller') return 0;
    const owned = products.filter(p => p.ownerId === user.id);
    return owned.reduce((sum, p) => sum + p.price * (p.soldCount || 0), 0);
  }, [user, products]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) return;
    onLogin({ id: email.toLowerCase(), email, role });
  };

  return (
    <section id="account" className="relative w-full bg-[#0b0615] px-6 py-12 text-white">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Your Account</h2>
          {user ? (
            <button onClick={onLogout} className="inline-flex items-center gap-2 rounded-md border border-violet-400/30 bg-white/5 px-3 py-2 text-sm text-violet-200 transition hover:bg-white/10">
              <LogOut size={16} /> Logout
            </button>
          ) : null}
        </div>

        {!user ? (
          <form onSubmit={handleLogin} className="grid w-full grid-cols-1 gap-4 rounded-xl border border-violet-500/20 bg-white/5 p-5 backdrop-blur md:grid-cols-3">
            <div className="col-span-2">
              <label className="block text-xs text-violet-200/70">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@domain.com" className="mt-2 w-full rounded-md border border-violet-500/30 bg-[#120a28] px-3 py-2 text-sm text-white placeholder-violet-300/40 outline-none ring-violet-400/30 focus:ring" />
            </div>
            <div>
              <label className="block text-xs text-violet-200/70">Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="mt-2 w-full rounded-md border border-violet-500/30 bg-[#120a28] px-3 py-2 text-sm text-white outline-none ring-violet-400/30 focus:ring">
                <option value="user">Buyer</option>
                <option value="seller">Seller</option>
              </select>
            </div>
            <div className="md:col-span-3">
              <button type="submit" className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow shadow-violet-600/30 transition hover:bg-violet-500">
                <Shield size={16} /> Sign in
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="rounded-xl border border-violet-500/20 bg-white/5 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600/30">
                  <User />
                </div>
                <div>
                  <div className="text-sm text-violet-200/80">Signed in as</div>
                  <div className="text-sm font-medium">{user.email}</div>
                </div>
              </div>
              <div className="mt-3 text-xs text-violet-300/60">Role: <span className="uppercase">{user.role}</span></div>
              {user.role === 'seller' && (
                <div className="mt-4 rounded-lg border border-violet-500/20 bg-[#100823] p-4">
                  <div className="flex items-center gap-2 text-violet-200/80"><DollarSign size={16} /> Earnings</div>
                  <div className="mt-2 text-2xl font-semibold">${earnings.toFixed(2)}</div>
                  <div className="mt-1 text-xs text-violet-300/60">Calculated from your sales</div>
                </div>
              )}
            </div>

            <div className="rounded-xl border border-violet-500/20 bg-white/5 p-0 md:col-span-2">
              <div className="flex items-center gap-2 border-b border-violet-500/20 p-2">
                <button onClick={() => setActiveTab('cart')} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm ${activeTab === 'cart' ? 'bg-violet-600 text-white' : 'text-violet-200 hover:bg-white/5'}`}>
                  <ShoppingCart size={16} /> Cart ({cart.length})
                </button>
                <button onClick={() => setActiveTab('favorites')} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm ${activeTab === 'favorites' ? 'bg-violet-600 text-white' : 'text-violet-200 hover:bg-white/5'}`}>
                  <Heart size={16} /> Favorites ({favorites.length})
                </button>
              </div>
              <div className="p-4">
                {activeTab === 'cart' && (
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {cart.length === 0 ? (
                      <div className="text-sm text-violet-300/70">Your cart is empty.</div>
                    ) : (
                      cart.map(item => (
                        <div key={item.id} className="flex items-center justify-between gap-3 rounded-lg border border-violet-500/20 bg-[#0f0920] p-3">
                          <div className="flex items-center gap-3">
                            <img src={item.photo} alt={item.name} className="h-12 w-12 rounded-md object-cover" />
                            <div>
                              <div className="text-sm font-medium">{item.name}</div>
                              <div className="text-xs text-violet-300/70">${item.price.toFixed(2)}</div>
                            </div>
                          </div>
                          <button onClick={() => onRemoveFromCart(item.id)} className="rounded-md border border-violet-500/20 px-2 py-1 text-xs text-violet-200 hover:bg-white/5">Remove</button>
                        </div>
                      ))
                    )}
                  </div>
                )}
                {activeTab === 'favorites' && (
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {favorites.length === 0 ? (
                      <div className="text-sm text-violet-300/70">No favorites yet.</div>
                    ) : (
                      favorites.map(item => (
                        <div key={item.id} className="flex items-center justify-between gap-3 rounded-lg border border-violet-500/20 bg-[#0f0920] p-3">
                          <div className="flex items-center gap-3">
                            <img src={item.photo} alt={item.name} className="h-12 w-12 rounded-md object-cover" />
                            <div>
                              <div className="text-sm font-medium">{item.name}</div>
                              <div className="text-xs text-violet-300/70">${item.price.toFixed(2)}</div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
