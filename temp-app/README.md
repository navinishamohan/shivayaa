# Shivayaa Couture Coming Soon

Premium coming-soon landing page built with React and Vite.

## Included

- Logo-first couture hero layout
- Premium emerald 3D depth effects and ambient motion
- Intro reveal animation
- Email subscribe flow with pluggable provider adapter
- Social links and responsive mobile-first behavior

## Quick Start

1. Install dependencies:
   npm install
2. Start the app:
   npm run dev
3. Build for static hosting:
   npm run build

Deploy the generated dist folder.

## Logo Setup

Place your provided logo image at:
public/brand-logo.png

The page includes an automatic fallback wordmark if this file is missing.

## Formspree Setup

1. Copy .env.example to .env
2. Create a form in Formspree and copy your endpoint URL.
3. Set the endpoint:
   VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id

The adapter file is:
src/lib/subscribeAdapter.js

If no endpoint is configured, submissions will fail with a configuration message.
