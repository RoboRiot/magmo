# MAGMO - AI Coding Instructions

## Project Overview
MAGMO is a Next.js 10 business management system with Firebase hosting, featuring warehouse/inventory management, client relationships, and BlueFolder integration. The app uses Firebase for authentication, Firestore for data, and OpenAI for AI-powered search capabilities.

## Architecture & Key Patterns

### Authentication Flow
- **Context**: `context/AuthUserContext.js` wraps the app via `pages/_app.js`
- **Firebase Auth**: Uses `firebase/compat/auth` (legacy SDK) with Google sign-in
- **Protection**: Wrap pages with `<ProtectedRoute>` component from `components/ProtectedRoute.js`
- **Pattern**: Check `authUser` and `loading` state before rendering protected content

### Firebase Configuration
- **Client**: `context/Firebase.js` - uses compat SDK with hardcoded credentials
- **Server**: `context/FirebaseAdmin.js` - admin SDK for SSR pages with service account
- **Firestore Collections**: `warehouse`, `clients`, `machines`, `items`
- **Critical**: Always check `!Firebase.apps.length` before initializing

### Next.js Routing & SSR
- **SSR Pages**: `/item/[id]`, `/client/[id]`, `/machine/[id]` use `getServerSideProps`
- **Client-side Routing Fix**: `pages/_app.js` handles Firebase Hosting SPA routing issues
- **Deployment**: Uses Firebase Functions for SSR, not static export

### Build & Development Workflow

```bash
# Development (uses legacy OpenSSL)
npm run dev    # cross-env NODE_OPTIONS=--openssl-legacy-provider next dev

# Production Build
npm run prebuild  # Patches Next.js for React prebundling issues
npm run build     # Builds with legacy OpenSSL
npm run start     # Production server

# Firebase Deployment
.\deploy.ps1      # PowerShell script: build → copy to functions → deploy
```

**Critical**: Always run `prebuild.js` before building - it patches Next.js require-hook for React compatibility.

### Data Management Patterns

#### Firestore Data Structure
```javascript
// Collections: warehouse, clients, machines, items
// Document IDs are typically UUIDs
// Always use firebase.firestore() for client-side queries
// Use FirebaseAdmin for server-side in getServerSideProps
```

#### Table Components Pattern
- **Reusable Tables**: `utils/ClientTable.js`, `utils/PartTable.js`, `utils/ModelTable.js`
- **Props Pattern**: `onSelect`, `onInfo`, `clearSelection`, `disableSelect`, `disableInfo`
- **Always Include**: "Clear Selection" and "Add New" buttons in table headers

### External Integrations

#### BlueFolder API
- **Service**: `context/BlueFolder/BlueFolderService.js`
- **Pattern**: XML requests with Basic auth, convert responses with `xml2js`
- **Current State**: Integration scaffolded but not fully implemented

#### InFlow Inventory API
- **Service**: `utils/inflowAPI.js`
- **Pattern**: REST API with Bearer token auth, JSON payloads
- **Methods**: `upsertProduct()`, `findProductByName()`

#### OpenAI Integration
- **Endpoint**: `pages/api/gpt/AskMagmo.js`
- **Knowledge Store**: `pages/api/gpt/knowledge_store.json` - embeddings cache
- **Pattern**: RAG implementation using cosine similarity (`utils/cosineSim.js`)

### UI/UX Conventions

#### Bootstrap Integration
- **Global**: `pages/_app.js` imports bootstrap CSS and JS bundle
- **Components**: Use React Bootstrap components consistently
- **Custom Styles**: Module CSS files in `styles/` directory

#### Loading States
- **Pattern**: `LoadingButton` component with `simulateNetworkRequest()`
- **State**: `const [isLoading, setLoading] = useState(false)`
- **Usage**: Disable interactions and show "Loading..." text

#### Modal Patterns
- **Location**: Many modals in `pages/NewSearch/` directory
- **Pattern**: Bootstrap Modal with controlled show/hide state
- **Data Flow**: Pass data via props, handle close with callbacks

### File Organization

#### Page Structure
- **Dashboard**: `pages/dashboard.js` - main hub with navigation buttons
- **Feature Modules**: `pages/NewSearch/`, `pages/Warehousedb/`, `pages/BlueFolder/`
- **Dynamic Routes**: `[id]` folders for entity-specific pages

#### Context & Services
- **Auth**: All auth logic in `context/` directory
- **Services**: External API services in `utils/` and `context/BlueFolder/`
- **Components**: Reusable UI components in `components/`

## Development Guidelines

### Working with PDFs
- **Client-only**: PDF handling wrapped in `typeof window !== "undefined"` checks
- **Webpack Config**: PDFs ignored on server-side builds via `next.config.js`
- **Worker**: Uses CDN worker for PDF.js

### Error Handling
- **Firebase**: Always handle auth state changes and loading states
- **API Calls**: Check for network errors and show user-friendly messages
- **Firestore**: Handle document not found cases gracefully

### Adding New Features
1. **Auth Protection**: Wrap with `<ProtectedRoute>` if user data required
2. **Firestore Access**: Use client SDK for components, Admin SDK for SSR
3. **Navigation**: Add to `pages/dashboard.js` if it's a main feature
4. **Tables**: Follow existing table component patterns for consistency
5. **Modals**: Create in appropriate feature directory with Bootstrap Modal

### Deployment Considerations
- **Firebase Config**: `firebase.json` configured for Functions-based SSR
- **Build Process**: Must use PowerShell deployment script on Windows
- **Environment**: Production uses hardcoded Firebase credentials (consider env vars)
- **Legacy Dependencies**: Next.js 10 and React 16 - avoid modern React features