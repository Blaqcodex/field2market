import { Link } from 'react-router-dom';

const stats = [
  { label: 'Local producers', value: '120+' },
  { label: 'Fresh listings', value: '980+' },
  { label: 'Communities served', value: '12' }
];

export default function Home() {
  return (
    <section className="space-y-14">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <p className="inline-flex rounded-full bg-accent/20 px-4 py-2 text-sm font-semibold text-slate-900">
            Trusted by local farmers and nearby buyers
          </p>
          <h1 className="max-w-3xl text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
            Fresh produce, direct from field to family table.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">
            Field2Market modernizes the farmer marketplace with an elegant shopping experience, secure login,
            and real-time inventory storage powered by Firebase.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              to="/listings"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-slate-900"
            >
              Browse produce
            </Link>
            <Link
              to="/add"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Sell your harvest
            </Link>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 px-8 py-10 text-white shadow-2xl shadow-slate-900/10">
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-slate-700/80 to-transparent" />
          <div className="relative space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-300">Empower local trade</p>
            <h2 className="text-4xl font-bold">A modern marketplace for small farmers</h2>
            <p className="max-w-xl text-slate-300">
              Build trust with a crisp interface, direct messaging, and transparent pricing for every listing.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {stats.map(stat => (
          <div key={stat.label} className="rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm">
            <p className="text-3xl font-semibold text-slate-900">{stat.value}</p>
            <p className="mt-3 text-sm uppercase tracking-[0.22em] text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <article className="rounded-3xl bg-white p-8 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Secure sign-in</h3>
          <p className="mt-4 text-slate-600">
            Every seller and buyer is authenticated by Firebase Auth so listings remain tied to real users.
          </p>
        </article>
        <article className="rounded-3xl bg-white p-8 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Real database storage</h3>
          <p className="mt-4 text-slate-600">
            Listings are stored in Cloud Firestore with image storage handled by Firebase Storage.
          </p>
        </article>
        <article className="rounded-3xl bg-white p-8 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Fast mobile UI</h3>
          <p className="mt-4 text-slate-600">
            Fully responsive pages and smooth navigation deliver a modern marketplace experience on phones and desktop.
          </p>
        </article>
      </div>
    </section>
  );
}
