# Field2Market - AI Coding Guidelines

## Project Overview
Field2Market is a web marketplace connecting farmers directly to markets. Built with vanilla HTML/CSS/JavaScript, using Firebase for backend services and Tailwind CSS for responsive styling.

## Architecture
- **Frontend**: Multi-page HTML application with shared CSS/JS
- **Backend**: Firebase (Firestore for data, Auth for users, Storage for images)
- **Styling**: Tailwind CSS (CDN) + custom styles in `css/style.css`
- **Structure**: 
  - `index.html` - Landing/home page
  - `listings.html` - Browse marketplace listings
  - `add-listings.html` - Create new listings
  - `js/main.js` - Shared JavaScript functionality
  - `firebase.js` - Firebase configuration and utilities

## Key Patterns

### Firebase Integration
- Initialize Firebase in `firebase.js` with config object
- Use Firestore for listings data with collections like `listings`
- Implement Firebase Auth for farmer/market authentication
- Store listing images in Firebase Storage

### Component Structure
- Each HTML page is self-contained with its own script tags
- Shared utilities go in `js/main.js`
- Use Tailwind utility classes for responsive design
- Custom styles in `css/style.css` for project-specific overrides

### Data Models
- **Listing**: `{title, description, price, farmerId, category, images[], location, createdAt}`
- **User**: `{name, email, role: 'farmer'|'market', contactInfo}`

### Navigation
- Simple anchor-based navigation between pages
- No routing framework - each page is a separate HTML file
- Maintain consistent header/footer across pages

## Development Workflow
- Open HTML files directly in browser for development
- Use browser dev tools for debugging
- Firebase console for data inspection
- No build process required - static hosting ready

## Code Style
- Use modern ES6+ JavaScript
- Async/await for Firebase operations
- Descriptive variable names (e.g., `listingsCollection`, `currentUser`)
- Consistent Tailwind class ordering
- Inline comments for complex Firebase queries

## Common Tasks
- Adding new pages: Create new HTML file, link from navigation
- Firebase operations: Import from `firebase.js`, use async functions
- Styling: Tailwind first, custom CSS for complex layouts
- Data fetching: Use `getDocs()`, `addDoc()`, `updateDoc()` from Firestore