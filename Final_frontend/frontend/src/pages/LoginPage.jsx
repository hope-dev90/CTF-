import React, { useState } from 'react';
import { authApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function LoginPage({ onNavigateToSignup }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await authApi.login(form);
      login(data.token, data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: '#0A0A0A' }}
    >
      {/* Background grid effect */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(49,227,104,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(49,227,104,0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="w-full max-w-md relative z-10">
        {/* Logo / branding */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-4xl" style={{ color: '#31e368' }}>
              terminal
            </span>
            <h1
              className="text-3xl font-bold"
              style={{ color: '#31e368', fontFamily: 'Hanken Grotesk' }}
            >
              Payload Hub
            </h1>
          </div>
          <p className="text-sm font-mono" style={{ color: '#bbcbb8' }}>
            Sign in to your account
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8 border"
          style={{ background: '#141414', borderColor: '#3c4a3c' }}
        >
          {error && (
            <div
              className="mb-6 p-3 rounded-lg border text-sm font-mono"
              style={{
                background: '#93000a22',
                borderColor: '#ffb4ab',
                color: '#ffb4ab',
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label
                className="block text-xs font-mono mb-2 uppercase tracking-widest"
                style={{ color: '#bbcbb8' }}
              >
                Email
              </label>
              <div
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-all"
                style={{ background: '#0e0e0e', borderColor: '#3c4a3c' }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 18, color: '#bbcbb8' }}
                >
                  mail
                </span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  required
                  placeholder="you@example.com"
                  className="flex-1 bg-transparent border-none outline-none text-sm"
                  style={{ color: '#e5e2e1', fontFamily: 'JetBrains Mono' }}
                />
              </div>
            </div>

            <div>
              <label
                className="block text-xs font-mono mb-2 uppercase tracking-widest"
                style={{ color: '#bbcbb8' }}
              >
                Password
              </label>
              <div
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-all"
                style={{ background: '#0e0e0e', borderColor: '#3c4a3c' }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 18, color: '#bbcbb8' }}
                >
                  lock
                </span>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                  required
                  placeholder="••••••••"
                  className="flex-1 bg-transparent border-none outline-none text-sm"
                  style={{ color: '#e5e2e1', fontFamily: 'JetBrains Mono' }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-60"
              style={{ background: '#31e368', color: '#00702c' }}
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin" style={{ fontSize: 18 }}>
                    progress_activity
                  </span>
                  Authenticating...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                    login
                  </span>
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm font-mono" style={{ color: '#bbcbb8' }}>
              No account?{' '}
              <button
                onClick={onNavigateToSignup}
                className="font-bold transition-all hover:underline"
                style={{ color: '#31e368', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Create one
              </button>
            </p>
          </div>
        </div>

        {/* Footer hint */}
        <p
          className="text-center text-xs font-mono mt-6"
          style={{ color: '#3c4a3c' }}
        >
          CTF Knowledge Hub — Authorized users only
        </p>
      </div>
    </div>
  );
}
