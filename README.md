# osf-website

Merged and rebuilt website for "Our Startup Freelancer".

## What is included
- Home, Services, Portfolio, Contact, Hire Us, Request Project pages.
- Auth pages in `/auth`: signup + login using `localStorage` (demo only).
- Single global CSS: `css/styles.css`
- Single global JS: `js/script.js`
- Assets folder for images.

## How to use locally
1. Download or clone this repo.
2. (Optional) Serve with a lightweight server:
   - Python: `python -m http.server 8000`
   - Open: `http://localhost:8000`
3. Or open `index.html` directly.

## Auth details (demo)
- Signup stores users in `localStorage` (`users` array).
- Login sets `currentUser` and `currentUserName` in `localStorage`.
- Logout clears them. No server involved.

## Deploy
- You can host on GitHub Pages, Netlify, or Vercel. For GitHub Pages:
  - Push repo to GitHub.
  - In repo Settings → Pages → select `main` branch root.
  - Wait a minute and open the provided URL.

## Customize
- Replace `assets/images/*` with your real images.
- Tweak `css/styles.css` to refine spacing/typography.
