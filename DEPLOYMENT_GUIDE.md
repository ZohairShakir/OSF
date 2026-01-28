# OSF Platform - Deployment Guide

## Quick Fix for Module Resolution Error

The error you're seeing is because ts-node needs proper configuration. The fix has been applied:

1. **Updated `package.json` scripts:**
   - Changed to use `ts-node --transpile-only` flag
   - This bypasses type checking during runtime (faster startup)

2. **Created `tsconfig.server.json`:**
   - Separate TypeScript config for server
   - Uses CommonJS module system (required for Node.js)

## Installation

Run this command to install all dependencies:

```bash
npm install
```

This will install:
- Backend dependencies (Express, Mongoose, etc.)
- Frontend dependencies (React, Vite, etc.)
- All TypeScript types

## Starting the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
npm run dev
```
Backend runs on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Frontend runs on `http://localhost:3000`

### Production Mode

**Build Backend:**
```bash
npm run build:server
node dist/server/index.js
```

**Build Frontend:**
```bash
npm run build
```
Deploy the `dist/` folder to your hosting service.

## Environment Variables

### Development (.env)
```env
MONGODB_URI=mongodb+srv://osf_user:05SzNWixQJ0l8q1c@osf.kuz3xkc.mongodb.net/osfdb?retryWrites=true&w=majority&appName=OSF
PORT=5000
JWT_SECRET=osf_secret_key_2025_secure_production
CLIENT_URL=http://localhost:3000
```

### Production (.env.production)
```env
MONGODB_URI=mongodb+srv://osf_user:05SzNWixQJ0l8q1c@osf.kuz3xkc.mongodb.net/osfdb?retryWrites=true&w=majority&appName=OSF
PORT=5000
JWT_SECRET=<CHANGE_TO_STRONG_RANDOM_SECRET>
CLIENT_URL=https://yourdomain.com
NODE_ENV=production
```

### Frontend Production (.env.production)
```env
VITE_API_URL=https://api.yourdomain.com
# OR if same domain:
VITE_API_URL=/api
```

## Production Deployment

See `CASE_STUDY.md` Section 15 for complete deployment instructions.

Key points:
1. Update CORS to allow production domain
2. Set strong JWT_SECRET
3. Configure VITE_API_URL for frontend
4. Use reverse proxy (nginx) if same domain
5. Enable HTTPS/SSL

## Troubleshooting

### Module Resolution Error
If you still see module errors:
1. Delete `node_modules` folder
2. Delete `package-lock.json`
3. Run `npm install` again
4. Try `npm run dev` again

### Port Already in Use
If port 5000 or 3000 is taken:
- Backend: Change `PORT` in `.env`
- Frontend: Change port in `vite.config.ts`

### MongoDB Connection Issues
- Check MongoDB Atlas IP whitelist
- Verify connection string
- Check network firewall

## Support

For detailed information, see:
- `CASE_STUDY.md` - Complete technical documentation
- `SETUP_INSTRUCTIONS.md` - Setup guide
