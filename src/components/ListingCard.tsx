import { Link } from 'react-router-dom';
import { Listing } from '../types';

interface Props {
  listing: Listing;
}

export default function ListingCard({ listing }: Props) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <img src={listing.imageUrl} alt={listing.title} className="h-64 w-full object-cover" />
      <div className="p-6">
        <div className="flex items-center justify-between gap-3 text-sm text-slate-500">
          <span className="rounded-full bg-slate-100 px-3 py-1">{listing.category}</span>
          <span className="font-semibold text-slate-900">{listing.price}</span>
        </div>
        <h3 className="mt-4 text-2xl font-semibold text-slate-900">{listing.title}</h3>
        <p className="mt-3 text-slate-600">By {listing.farmer}</p>
        <p className="mt-1 text-slate-500">{listing.location}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`https://wa.me/${listing.contact.replace(/\D/g, '')}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-1 items-center justify-center rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
          >
            Chat on WhatsApp
          </a>
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(listing.contact)}
            className="inline-flex flex-1 items-center justify-center rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Copy number
          </button>
        </div>
        <div className="mt-5">
          <Link
            to={`/listings/${listing.id}`}
            className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
