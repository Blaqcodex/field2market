import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const categories = ['Vegetables', 'Fruits', 'Grains', 'Eggs', 'Meat'];

export default function AddListing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    farmer: user?.email || '',
    category: categories[0],
    price: '',
    location: '',
    contact: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!imageFile) {
      setMessage('Please upload a product image.');
      return;
    }

    setLoading(true);
    setMessage('Saving listing…');

    try {
      const imageRef = ref(storage, `listings/${Date.now()}-${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);

      await addDoc(collection(db, 'listings'), {
        ...form,
        imageUrl,
        contact: form.contact.trim(),
        createdAt: serverTimestamp(),
        owner: user?.uid
      });

      navigate('/listings');
    } catch (error) {
      console.error(error);
      setMessage('Unable to save listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-4xl space-y-8">
      <div className="rounded-4xl border border-slate-200 bg-white p-10 shadow-sm">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">New listing</p>
          <h1 className="text-4xl font-bold text-slate-900">Share your harvest with nearby buyers.</h1>
          <p className="max-w-2xl text-slate-600">
            Add a listing with image, price, location, and contact details. Buyers can reach you directly via WhatsApp.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 grid gap-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Farmer name</span>
              <input
                type="text"
                value={form.farmer}
                onChange={e => handleChange('farmer', e.target.value)}
                required
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Product name</span>
              <input
                type="text"
                value={form.title}
                onChange={e => handleChange('title', e.target.value)}
                required
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Category</span>
              <select
                value={form.category}
                onChange={e => handleChange('category', e.target.value)}
                required
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {categories.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Price</span>
              <input
                type="text"
                value={form.price}
                onChange={e => handleChange('price', e.target.value)}
                required
                placeholder="R50 / 5kg"
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Location</span>
              <input
                type="text"
                value={form.location}
                onChange={e => handleChange('location', e.target.value)}
                required
                placeholder="Village, Province"
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Contact</span>
              <input
                type="tel"
                value={form.contact}
                onChange={e => handleChange('contact', e.target.value)}
                required
                placeholder="+277xxxxxxxx"
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Product image</span>
            <input
              type="file"
              accept="image/*"
              onChange={event => setImageFile(event.target.files?.[0] ?? null)}
              required
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {loading ? 'Posting listing…' : 'Post listing'}
          </button>

          {message ? <p className="text-sm text-slate-600">{message}</p> : null}
        </form>
      </div>
    </section>
  );
}
