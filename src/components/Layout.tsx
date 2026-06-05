import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Marketplace', to: '/listings' }
];

export default function Layout() {
  const { user, signOutUser } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="backdrop-blur sticky top-0 z-40 border-b border-slate-200/70 bg-white/90">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <Link to="/" className="text-2xl font-extrabold tracking-tight text-slate-900">
            Field2Market
          </Link>
          <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-700">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`transition hover:text-slate-900 ${location.pathname === link.to ? 'text-slate-900' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  to="/my-listings"
                  className={`transition hover:text-slate-900 ${location.pathname === '/my-listings' ? 'text-slate-900' : ''}`}
                >
                  My listings
                </Link>
                <Link to="/add" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800">
                  Add Listing
                </Link>
                <button
                  type="button"
                  onClick={signOutUser}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="rounded-full border border-primary bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white/80 py-6 text-center text-sm text-slate-600">
        © 2026 Field2Market · Built with modern React, Firebase, and Tailwind.
      </footer>
    </div>
  );
}
