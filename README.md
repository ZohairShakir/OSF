# OSF Platform - Our Startup Freelancer

Full-stack application with separate frontend and backend.

## 📁 Project Structure

```
osff/
├── backend/     # Node.js + Express + MongoDB API
└── frontend/    # React + Vite + TypeScript
```

## 🚀 Quick Start

### 1. Setup Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on: **http://localhost:5000**

### 2. Setup Frontend (New Terminal)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: **http://localhost:3000**

## 📋 Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- `.env` file in `backend/` folder (see setup below)

## ⚙️ Backend Setup

1. **Navigate to backend:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```env
   MONGODB_URI=mongodb+srv://osf_user:05SzNWixQJ0l8q1c@osf.kuz3xkc.mongodb.net/osfdb?retryWrites=true&w=majority&appName=OSF
   PORT=5000
   JWT_SECRET=osf_secret_key_2025_secure_production
   CLIENT_URL=http://localhost:3000
   ```

4. **Start server:**
   ```bash
   npm run dev
   ```

## ⚙️ Frontend Setup

1. **Navigate to frontend:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start dev server:**
   ```bash
   npm run dev
   ```

## 🎯 Development Workflow

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Visit: **http://localhost:3000**

## 📚 Documentation

- `PROJECT_STRUCTURE.md` - Project organization
- `CASE_STUDY.md` - Complete technical documentation
- `DEPLOYMENT_GUIDE.md` - Production deployment guide

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
