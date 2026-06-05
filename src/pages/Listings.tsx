import { useEffect, useMemo, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import ListingCard from '../components/ListingCard';
import { Listing } from '../types';

const categories = ['All categories', 'Vegetables', 'Fruits', 'Grains', 'Eggs', 'Meat'];

export default function Listings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All categories');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadListings() {
      try {
        const snapshots = await getDocs(query(collection(db, 'listings')));
        const docs = snapshots.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Listing[];
        setListings(docs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadListings();
  }, []);

  const filteredListings = useMemo(
    () =>
      listings.filter(listing => {
        const matchesCategory = category === 'All categories' || listing.category === category;
        const matchesSearch = [listing.title, listing.farmer, listing.location].some(field =>
          field.toLowerCase().includes(search.toLowerCase())
        );
        return matchesCategory && matchesSearch;
      }),
    [category, listings, search]
  );

  return (
    <section className="space-y-8">
      <header className="rounded-4xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Marketplace</p>
            <h1 className="mt-3 text-4xl font-bold text-slate-900">Browse fresh listings</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by crop, farmer, or location"
              className="w-full min-w-[220px] rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 lg:w-auto"
            />
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="rounded-3xl border border-slate-200 bg-white px-5 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              {categories.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
            Loading listings…
          </div>
        ) : filteredListings.length ? (
          filteredListings.map(listing => <ListingCard key={listing.id} listing={listing} />)
        ) : (
          <div className="col-span-full rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-sm">
            No listings found. Try a different keyword or category.
          </div>
        )}
      </div>
    </section>
  );
}
