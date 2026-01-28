# OSF Platform - Our Startup Freelancer

Full-stack application with separate frontend and backend.

## 📁 Project Structure

```
osff/
├── backend/     # Node.js + Express + MongoDB API
└── frontend/    # React + Vite + TypeScript
```

## 🛠️ Tech Stack

**Backend:**
- Node.js + Express
- TypeScript
- MongoDB (Mongoose)
- JWT Authentication

**Frontend:**
- React 18
- TypeScript
- Vite
- React Router
- Framer Motion
- Tailwind CSS

## 📝 Scripts

### Backend:
- `npm run dev` - Start development server
- `npm start` - Start production server
- `npm run build` - Build TypeScript

### Frontend:
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🔧 Troubleshooting

**Port 5000 in use:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Port 3000 in use:**
Change port in `frontend/vite.config.ts`

**MongoDB connection error:**
- Check `.env` file in `backend/` folder
- Verify MongoDB Atlas IP whitelist
- Check internet connection

## 📞 Support

See documentation files for detailed information.
