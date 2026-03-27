# 🚀 Quick Start Guide

Get your Personal Sustainability Time-Machine up and running in minutes!

## Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Python** 3.9+ ([Download](https://www.python.org/downloads/))
- **PostgreSQL** 12+ ([Download](https://www.postgresql.org/download/))

---

## 🏃 Fast Setup (5 minutes)

### Step 1: Clone & Install

```bash
# Run the automated setup script
chmod +x setup.sh
./setup.sh
```

This will install all frontend and backend dependencies.

### Step 2: Setup PostgreSQL

```bash
# Create the database
createdb sustainability_db

# Or using psql
psql -U postgres
CREATE DATABASE sustainability_db;
\q
```

### Step 3: Configure Backend

Edit `backend/.env`:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/sustainability_db
SECRET_KEY=YOUR_SECRET_KEY_HERE
```

**Generate a secure secret key:**
```bash
python3 -c "import secrets; print(secrets.token_urlsafe(32))"
```

### Step 4: Start the Servers

**Terminal 1 - Backend:**
```bash
cd backend
python3 main.py
```
✅ Backend running at http://localhost:8000

**Terminal 2 - Frontend:**
```bash
npm run dev
```
✅ Frontend running at http://localhost:5173

---

## 🎯 First Time Use

1. **Open** http://localhost:5173/login
2. **Click** "Sign up"
3. **Create** your account:
   - Name: Your Name
   - Email: your@email.com
   - Password: ******** (min 6 characters)
4. **Start** tracking your sustainability journey!

---

## 🧪 Test the Integration

### Verify Backend
```bash
curl http://localhost:8000/health
# Expected: {"status": "healthy"}
```

### View API Documentation
Open http://localhost:8000/docs in your browser

---

## 📱 Using the App

1. **Dashboard** - View your sustainability score and overview
2. **Add Data** - Record your daily activities (travel, energy, water, waste)
3. **Time-Rewind** - See how eco-friendly alternatives could reduce emissions
4. **Recommendations** - Get AI-powered sustainability tips
5. **Goals** - Set and track your sustainability goals

---

## ⚙️ Configuration

### Frontend (.env in root)
```env
VITE_API_URL=http://localhost:8000
```

### Backend (backend/.env)
```env
DATABASE_URL=postgresql://user:pass@localhost:5432/sustainability_db
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
FRONTEND_URL=http://localhost:5173
```

---

## 🐛 Common Issues

### "Database connection failed"
- ✅ Check PostgreSQL is running: `pg_isready`
- ✅ Verify DATABASE_URL in backend/.env
- ✅ Ensure database exists: `psql -l | grep sustainability`

### "Module not found"
- ✅ Frontend: Run `npm install`
- ✅ Backend: Run `pip3 install -r requirements.txt`

### "CORS error"
- ✅ Check FRONTEND_URL in backend/.env matches your frontend URL
- ✅ Restart the backend server

### "401 Unauthorized"
- ✅ Logout and login again (token might be expired)
- ✅ Check if backend is running

---

## 📚 Next Steps

- Read **INTEGRATION_README.md** for detailed documentation
- Explore **Backend API** at http://localhost:8000/docs
- Check **backend/README.md** for backend-specific details

---

## 💡 Pro Tips

1. Keep both terminals open while developing
2. Backend auto-reloads on code changes
3. Frontend has hot module replacement (HMR)
4. Check browser console for any errors
5. Use the API docs to test endpoints directly

---

## 🎉 You're Ready!

Your Personal Sustainability Time-Machine is now running!

Start by adding some data and watch your sustainability score evolve. 🌱

---

**Need help?** Check the full documentation in `INTEGRATION_README.md`
