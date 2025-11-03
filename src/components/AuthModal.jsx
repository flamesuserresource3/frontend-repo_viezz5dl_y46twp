import React, { useState } from 'react';
import { Shield, X } from 'lucide-react';

export default function AuthModal({ open, onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    if (!email) return;
    onLogin({ id: email.toLowerCase(), email, role });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-[92vw] max-w-md overflow-hidden rounded-2xl border border-violet-500/30 bg-gradient-to-b from-[#160a33] to-[#0f0920] shadow-[0_20px_100px_-20px_rgba(139,92,246,0.5)]">
        <div className="flex items-center justify-between border-b border-violet-500/20 px-5 py-4">
          <div className="text-sm text-violet-200/80">Sign in to continue</div>
          <button onClick={onClose} className="rounded-md p-2 text-violet-200 hover:bg-white/5"><X size={18} /></button>
        </div>
        <form onSubmit={submit} className="p-5">
          <label className="block text-xs text-violet-200/70">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@domain.com" className="mt-2 w-full rounded-md border border-violet-500/30 bg-[#120a28] px-3 py-2 text-sm text-white placeholder-violet-300/40 outline-none ring-violet-400/30 focus:ring" />
          <label className="mt-4 block text-xs text-violet-200/70">Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="mt-2 w-full rounded-md border border-violet-500/30 bg-[#120a28] px-3 py-2 text-sm text-white outline-none ring-violet-400/30 focus:ring">
            <option value="user">Buyer</option>
            <option value="seller">Seller</option>
          </select>
          <button type="submit" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow shadow-violet-600/30 transition hover:bg-violet-500">
            <Shield size={16} /> Continue
          </button>
        </form>
      </div>
    </div>
  );
}
