import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import { fetchUserListings } from '../lib/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { Listing } from '../types';
import ListingCard from '../components/ListingCard';

export default function MyListings() {
  const { user } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user?.uid) return;

    const userId = user.uid;

    async function loadMyListings() {
      try {
        const docs = await fetchUserListings(userId);
        setListings(docs);
      } catch (err) {
        console.error(err);
        setError('Unable to load your listings.');
      } finally {
        setLoading(false);
      }
    }

    loadMyListings();
  }, [user?.uid]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;

    try {
      await deleteDoc(doc(db, 'listings', id));
      setListings(prev => prev.filter(listing => listing.id !== id));
    } catch (err) {
      console.error(err);
      setError('Unable to delete listing.');
    }
  };

  return (
    <section className="space-y-8">
      <header className="rounded-4xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Your account</p>
            <h1 className="mt-3 text-4xl font-bold text-slate-900">My listings</h1>
            <p className="mt-4 text-slate-600">Manage your active produce listings and reach new buyers.</p>
          </div>
          <Link
            to="/add"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-white transition hover:bg-slate-900"
          >
            Post new listing
          </Link>
        </div>
      </header>

      {error ? <div className="rounded-4xl border border-red-200 bg-red-50 p-6 text-red-700">{error}</div> : null}

      {loading ? (
        <div className="rounded-4xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
          Loading your listings…
        </div>
      ) : listings.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-3">
          {listings.map(listing => (
            <div key={listing.id} className="group relative">
              <ListingCard listing={listing} />
              <div className="absolute right-4 top-4 flex gap-2 rounded-full bg-white/90 p-2 opacity-0 transition group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => handleDelete(listing.id)}
                  className="rounded-full bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-4xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-slate-600">You haven't posted any listings yet.</p>
          <Link to="/add" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-slate-900">
            Post your first listing
          </Link>
        </div>
      )}
    </section>
  );
}
