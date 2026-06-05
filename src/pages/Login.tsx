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
    <section className="mx-auto max-w-xl space-y-8 rounded-4xl border border-slate-200 bg-white p-10 shadow-sm">
      <div className="space-y-3 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Access the community marketplace</p>
        <h1 className="text-4xl font-bold text-slate-900">Sign in or create your account</h1>
        <p className="text-slate-600">Secure access for farmers and buyers with Firebase authentication.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
    </section>
  );
}
