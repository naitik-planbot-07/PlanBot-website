'use client';

import { useState } from 'react';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    // Using Buttondown API (Add your token to .env.local as NEXT_PUBLIC_BUTTONDOWN_API_KEY)
    try {
      const res = await fetch('https://api.buttondown.email/v1/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${process.env.NEXT_PUBLIC_BUTTONDOWN_API_KEY}`,
        },
        body: JSON.stringify({ email_address: email }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="glass-card p-8 md:p-10 my-16 text-center relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-pink-accent/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10 max-w-2xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Join the PlanBot Insider List</h3>
        <p className="text-text-secondary mb-8">
          Get weekly AI productivity hacks, early access to new features, and exclusive templates. No spam, ever.
        </p>

        {status === 'success' ? (
          <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl flex items-center justify-center gap-2">
            <span className="text-xl">🎉</span> You're in! Check your email to confirm.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 bg-surface border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-text-dim focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary whitespace-nowrap disabled:opacity-70 flex justify-center items-center"
            >
              {status === 'loading' ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                'Subscribe →'
              )}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className="text-red-400 text-sm mt-3">Something went wrong. Please try again later.</p>
        )}
      </div>
    </div>
  );
}
