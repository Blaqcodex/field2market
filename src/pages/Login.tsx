import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    try {
      if (isRegistering) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      navigate('/listings');
    } catch (err) {
      setError('Unable to sign in. Please check your credentials.');
      console.error(err);
    }
  };

  return (
    <section className="relative mx-auto max-w-xl overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white/95 p-10 shadow-[0_40px_120px_rgba(15,23,42,0.12)] ring-1 ring-slate-900/5">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-10 h-36 w-36 rounded-full bg-emerald-400/20 blur-3xl animate-float-slow" />
        <div className="absolute right-6 top-20 h-28 w-28 rounded-full bg-cyan-400/15 blur-3xl animate-pulse-slow" />
        <div className="absolute inset-x-6 top-0 h-full rounded-[2.5rem] bg-[radial-gradient(circle_at_top_left,rgba(20,83,50,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.08),transparent_32%)]" />
        <div className="absolute inset-x-0 top-1/2 h-60 bg-[radial-gradient(circle,rgba(14,165,233,0.12),transparent_80%)] blur-2xl" />
        <div className="absolute inset-x-0 bottom-10 h-24 bg-[linear-gradient(90deg,rgba(74,222,128,.08)_0%,transparent_20%,transparent_80%,rgba(56,189,248,.08)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-full bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.4),transparent)] opacity-40" />
      </div>

      <div className="relative z-10 space-y-8">
        <div className="space-y-3 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-emerald-700 shadow-[0_12px_50px_rgba(16,185,129,0.12)]">
            <span className="text-emerald-500">AR Farm Sync</span>
            <span className="text-slate-500">Live crop telemetry</span>
          </div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Access the community marketplace</p>
          <h1 className="text-4xl font-bold text-slate-900">Sign in or create your account</h1>
          <p className="text-slate-600">Secure access for farmers and buyers with Firebase authentication.</p>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950/5 px-6 py-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-300 via-cyan-400 to-amber-300 opacity-80 blur-xl" />
          <div className="absolute inset-x-6 top-8 h-[1px] bg-white/10 opacity-60 animate-scan-lines" />
          <div className="absolute left-5 top-24 h-28 w-28 rounded-full border border-cyan-200/10 bg-cyan-300/10 blur-2xl animate-float-slow" />
          <div className="absolute right-6 bottom-10 h-28 w-28 rounded-full border border-emerald-200/10 bg-emerald-300/10 blur-2xl animate-pulse-slow" />
          <form onSubmit={handleSubmit} className="relative space-y-6">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Email</span>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Password</span>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={6}
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-full bg-primary px-6 py-3 text-base font-semibold text-white transition hover:bg-slate-900"
            >
              {isRegistering ? 'Create account' : 'Sign in'}
            </button>
          </form>

          <div className="mt-6 grid grid-cols-3 gap-3 text-xs text-slate-500">
            <span className="rounded-3xl border border-white/10 bg-white/10 px-3 py-2 shadow-glow animate-plant-sprout">🌾 Crop overlay</span>
            <span className="rounded-3xl border border-white/10 bg-white/10 px-3 py-2 shadow-glow animate-plant-sprout">🛰️ Soil scan</span>
            <span className="rounded-3xl border border-white/10 bg-white/10 px-3 py-2 shadow-glow animate-plant-sprout">✨ Growth AI</span>
          </div>
        </div>

        <div className="text-center text-sm text-slate-600">
          <button
            type="button"
            onClick={() => setIsRegistering(prev => !prev)}
            className="font-semibold text-primary underline-offset-4 transition hover:text-slate-900"
          >
            {isRegistering ? 'Already have an account? Sign in' : 'New here? Create an account'}
          </button>
        </div>

        {error ? <p className="text-center text-sm text-red-600">{error}</p> : null}
      </div>
    </section>
  );
}
