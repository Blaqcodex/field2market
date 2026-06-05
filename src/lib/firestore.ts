import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
  Timestamp,
  where
} from 'firebase/firestore';
import { db } from './firebase';
import { Listing } from '../types';

const listingsCollection = collection(db, 'listings');

function normalizeTimestamp(value: unknown): string {
  if (!value) return '';
  if (value instanceof Timestamp) {
    return value.toDate().toISOString();
  }
  if (typeof value === 'object' && value !== null && 'seconds' in value) {
    const seconds = (value as Record<string, unknown>).seconds;
    if (typeof seconds === 'number') {
      return new Date(seconds * 1000).toISOString();
    }
  }
  return String(value);
}

function listingFromDoc(doc: QueryDocumentSnapshot<DocumentData>): Listing {
  const data = doc.data();
  return {
    id: doc.id,
    title: String(data.title || ''),
    farmer: String(data.farmer || ''),
    category: String(data.category || ''),
    price: String(data.price || ''),
    location: String(data.location || ''),
    contact: String(data.contact || ''),
    imageUrl: String(data.imageUrl || ''),
    createdAt: normalizeTimestamp(data.createdAt),
    owner: String(data.owner || '')
  };
}

export async function fetchListings(): Promise<Listing[]> {
  const snapshot = await getDocs(listingsCollection);
  return snapshot.docs
    .map(listingFromDoc)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function fetchListingById(id: string): Promise<Listing> {
  const docRef = doc(db, 'listings', id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    throw new Error('Listing not found');
  }

  return listingFromDoc(snapshot as QueryDocumentSnapshot<DocumentData>);
}

export async function fetchUserListings(userId: string): Promise<Listing[]> {
  const q = query(listingsCollection, where('owner', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs
    .map(listingFromDoc)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export type CreateListingPayload = Omit<Listing, 'id' | 'createdAt'>;

export async function createListing(payload: CreateListingPayload) {
  await addDoc(listingsCollection, {
    ...payload,
    createdAt: serverTimestamp()
  });
}
