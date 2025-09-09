# MAGMO SSR Implementation - Deployment Guide

## What We've Implemented

### 1. Server-Side Rendering (SSR) for Dynamic Routes

- **`/item/[id]`** - Individual item pages now render server-side
- **`/client/[id]`** - Individual client pages now render server-side
- **`/machine/[id]`** - Individual machine pages now render server-side

### 2. Firebase Admin SDK Integration

- Created `context/FirebaseAdmin.js` for server-side Firestore access
- Configured with your service account credentials

### 3. Fixed Firebase Hosting Configuration

- Removed the problematic catch-all rewrite rule that was redirecting all routes to `index.html`
- This was the root cause of the routing issues

## Deployment Changes Required

### 1. **Switch from Static Export to Server Deployment**

**Before (Static Export):**

```bash
npm run export  # This created static HTML files
```

**After (Server Deployment):**

```bash
npm run build   # Build the Next.js app
npm run start   # Start the production server
```

### 2. **Update Firebase Hosting Configuration**

The `firebase.json` has been updated to remove the problematic rewrite rule. Your hosting configuration now properly supports dynamic routes.

### 3. **Environment Variables**

Make sure these environment variables are set in your production environment:

- `FIREBASE_CLIENT_EMAIL` (already configured in code)
- `FIREBASE_PRIVATE_KEY` (already configured in code)

## How to Deploy

### Option 1: Firebase Functions (Recommended)

```bash
# Deploy to Firebase Functions
firebase deploy --only functions
```

### Option 2: Vercel (Alternative)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 3: Custom Server

```bash
# Build the app
npm run build

# Start the production server
npm run start
```

## What This Fixes

1. **Direct Navigation**: Users can now bookmark and directly access `/item/ABC123`, `/client/XYZ789`, etc.
2. **QR Code Access**: QR codes linking to specific items/clients/machines will work
3. **SEO**: Search engines can now properly index individual pages
4. **Performance**: Initial page load includes all necessary data, reducing client-side API calls

## Testing

1. **Local Testing**: Run `npm run dev` and test the dynamic routes
2. **Production Testing**: Deploy and test direct navigation to dynamic routes
3. **QR Code Testing**: Generate QR codes for specific items and test direct access

## Rollback Plan

If you need to rollback:

1. Revert `firebase.json` to include the catch-all rewrite rule
2. Remove the `getServerSideProps` functions from the three dynamic route files
3. Revert to `npm run export` for static generation

## Support

If you encounter any issues:

1. Check the browser console for errors
2. Verify Firebase Admin credentials are correct
3. Ensure the deployment environment supports Node.js
4. Check that all environment variables are properly set
