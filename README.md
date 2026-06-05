# 🌾 Field2Market

Field2Market is a modern web platform connecting local farmers directly with nearby buyers. Built with **React**, **Vite**, **TypeScript**, **Tailwind CSS**, and **Firebase**, the marketplace enables farmers to list fresh produce online and buyers to discover local agricultural products without middlemen.

## 🚀 Features

- **Secure authentication** with Firebase Authentication
- **Real-time marketplace** with Firestore database storage
- **Image uploads** with Firebase Cloud Storage
- **User dashboard** for managing personal listings
- **Responsive mobile-first UI** with Tailwind CSS
- **Production-ready security rules** for Firestore and Storage
- **Protected routes** for authenticated sellers
- **Search and filter** by category, location, and keywords

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + React Router
- **Build tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Hosting**: Firebase Hosting
- **Package manager**: npm

## 🏗️ Project Structure

```
field2market/
├── src/
│   ├── components/       # Reusable React components
│   ├── pages/            # Page components (Home, Listings, etc.)
│   ├── context/          # React context providers (Auth)
│   ├── lib/              # Firebase config and Firestore helpers
│   ├── App.tsx           # Main app routing
│   ├── main.tsx          # React entry point
│   └── index.css         # Global Tailwind styles
├── public/               # Static assets (images)
├── firestore.rules       # Firebase security rules
├── firebase.json         # Firebase hosting config
├── vite.config.ts        # Vite build configuration
├── tailwind.config.js    # Tailwind configuration
└── package.json          # Dependencies and scripts
```

## 🔐 Security Architecture

### Firebase Authentication
- Email/password authentication with Firebase Auth
- Protected routes requiring authentication to post listings
- User UID stored with each listing for ownership verification

### Firestore Security Rules
- **Read access**: All listings visible to everyone (public marketplace)
- **Create access**: Only authenticated users can create listings; must include `owner` field matching their UID
- **Update/Delete**: Only the listing owner can modify or delete their listings
- **Type validation**: Fields required in documents (title, farmer, category, price, etc.)

### Storage Security Rules
- **Read access**: Public (anyone can view listing images)
- **Write access**: Only authenticated users; 5MB file size limit; images only (MIME type validation)
- **Path restrictions**: Uploads only allowed in `/listings` directory

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd field2market
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Firebase
- Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
- Copy your Firebase config values
- Create `.env.local` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Set up Firebase Firestore & Storage
- Enable Firestore Database (start in test mode, then apply rules)
- Enable Cloud Storage (start in test mode, then apply rules)
- Copy `firestore.rules` content to Firestore Rules tab in Firebase Console

### 5. Run locally
```bash
npm run dev
```
App runs on `http://localhost:4173`

## 🚀 Production Deployment

### Deploy to Firebase Hosting

1. **Install Firebase CLI globally** (if not already installed):
```bash
npm install -g firebase-tools
```

2. **Build the production bundle**:
```bash
npm run build
```

3. **Login to Firebase**:
```bash
firebase login
```

4. **Initialize Firebase Hosting** (if not yet done):
```bash
firebase init hosting
```
Select the `dist` folder as your public directory.

5. **Deploy**:
```bash
firebase deploy
```

Your app is now live! Check the output for your hosting URL.

### Deploying Security Rules

Update security rules from the Firebase Console:
- Navigate to **Firestore** → **Rules** tab
- Copy content from `firestore.rules` file
- Click "Publish" to apply

Or use Firebase CLI:
```bash
firebase deploy --only firestore:rules
```

## 📊 Key Concepts & Architecture Decisions

### React Context for Auth
- `AuthContext` manages global authentication state
- `useAuth()` hook provides authentication to all components
- Eliminates prop drilling and centralizes auth logic

### Protected Routes
- `ProtectedRoute` component wraps routes requiring authentication
- Automatically redirects unauthenticated users to `/login`
- Loading state prevents flash of login page

### Firestore Helpers
- Centralized in `src/lib/firestore.ts`
- Separate functions for fetching listings, user listings, and creating listings
- Timestamp normalization handles Firestore timestamp objects safely

### Data Normalization
- `listingFromDoc()` transforms Firestore documents to TypeScript `Listing` interface
- Ensures type safety and prevents runtime errors
- Normalizes timestamps for consistent UI rendering

### Security-First Approach
- All database operations go through Firebase security rules
- Listings ownership enforced at database level
- Image uploads restricted by MIME type and file size

## 🔄 Git Commit History

The repository uses meaningful, incremental commits for easy tracking:

1. `chore: initialize Vite React app with TypeScript, Tailwind, and Firebase-ready config`
2. `feat: add React app structure, Firebase auth, layout, and marketplace pages`
3. `chore: add package-lock and ignore environment/build files`
4. `chore: remove legacy root files after migrating old static site into legacy folder`
5. `feat: add Firestore listing helpers, improve listing validation, and fix env typing`
6. `feat: add listing detail page, card navigation, and Firestore document fetch helper`
7. `feat: add Firebase security rules, user dashboard, and MyListings management page`

## 📋 Available Scripts

- `npm run dev` — Start Vite development server
- `npm run build` — Build TypeScript and create optimized production bundle
- `npm run preview` — Preview production build locally

## 🎯 Future Enhancements

- Search analytics and trending categories
- User profiles and ratings/reviews
- Direct messaging between buyers and sellers
- Order management and delivery tracking
- Payment integration (Stripe/PayPal)
- Email notifications for new listings
- Admin dashboard for moderation

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Community

Field2Market is built for farmers, by the community. Contributions are welcome! Please fork the repository and submit pull requests for any improvements.
