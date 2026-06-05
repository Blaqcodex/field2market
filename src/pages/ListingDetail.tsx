import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchListingById } from '../lib/firestore';
import { Listing } from '../types';

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const listingId = id ?? '';
    if (!listingId) return;

    async function loadListing() {
      try {
        const data = await fetchListingById(listingId);
        setListing(data);
      } catch (err) {
        console.error(err);
        setError('Unable to load listing.');
      } finally {
        setLoading(false);
      }
    }

    loadListing();
  }, [id]);

  if (loading) {
    return <div className="min-h-[60vh] rounded-4xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">Loading listing details…</div>;
  }

  if (error || !listing) {
    return (
      <div className="min-h-[60vh] rounded-4xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
        <p>{error || 'Listing not found.'}</p>
        <Link to="/listings" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-slate-900">
          Return to listings
        </Link>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <img src={listing.imageUrl} alt={listing.title} className="h-[420px] w-full object-cover" />
          <div className="p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{listing.category}</p>
                <h1 className="mt-3 text-4xl font-bold text-slate-900">{listing.title}</h1>
              </div>
              <p className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900">{listing.price}</p>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Farmer</h2>
                <p className="mt-3 text-lg text-slate-700">{listing.farmer}</p>
              </div>
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Origin</h2>
                <p className="mt-3 text-lg text-slate-700">{listing.location}</p>
              </div>
            </div>
            <div className="mt-8 rounded-3xl bg-slate-50 p-6 text-slate-700">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Contact</h2>
              <p className="mt-3 text-lg font-medium text-slate-900">{listing.contact}</p>
              <a
                href={`https://wa.me/${listing.contact.replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-slate-900"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <aside className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Listing overview</h2>
          <p className="mt-4 text-slate-600">Explore this item’s details, seller contact, and place a direct order via WhatsApp.</p>
          <dl className="mt-8 space-y-5 text-slate-700">
            <div className="rounded-3xl bg-slate-50 p-5">
              <dt className="text-xs uppercase tracking-[0.2em] text-slate-500">Category</dt>
              <dd className="mt-2 text-base font-semibold text-slate-900">{listing.category}</dd>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <dt className="text-xs uppercase tracking-[0.2em] text-slate-500">Price</dt>
              <dd className="mt-2 text-base font-semibold text-slate-900">{listing.price}</dd>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <dt className="text-xs uppercase tracking-[0.2em] text-slate-500">Posted on</dt>
              <dd className="mt-2 text-base font-semibold text-slate-900">{new Date(listing.createdAt).toLocaleDateString()}</dd>
            </div>
          </dl>
          <Link
            to="/listings"
            className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            Back to marketplace
          </Link>
        </aside>
      </div>
    </section>
  );
}
