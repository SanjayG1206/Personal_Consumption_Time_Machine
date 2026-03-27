# Personal Sustainability Time-Machine - Complete Integration Guide

This project consists of a **React Frontend** and a **FastAPI Backend** fully integrated with authentication, real-time data tracking, and sustainability analytics.

## 🏗️ Architecture Overview

### Frontend (React + TypeScript + Vite)
- **Framework**: React 18 with TypeScript
- **Routing**: React Router v7
- **UI Components**: Radix UI + Tailwind CSS
- **Charts**: Recharts
- **State Management**: React Context API
- **Authentication**: JWT tokens stored in localStorage

### Backend (Python + FastAPI)
- **Framework**: FastAPI
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT (JSON Web Tokens) with bcrypt
- **API**: RESTful with automatic OpenAPI documentation

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+ and npm/pnpm
- Python 3.9+
- PostgreSQL 12+

---

## 📦 Backend Setup

### 1. Install PostgreSQL and Create Database

```bash
# On Mac (using Homebrew)
brew install postgresql
brew services start postgresql

# On Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start

# Create database
createdb sustainability_db

# OR using psql
psql -U postgres
CREATE DATABASE sustainability_db;
\q
```

### 2. Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 3. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `backend/.env`:
```env
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/sustainability_db
SECRET_KEY=your-super-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
FRONTEND_URL=http://localhost:5173
```

**Important**: Change `SECRET_KEY` to a secure random string in production!

Generate a secure secret key:
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### 4. Run the Backend

```bash
cd backend
python main.py
```

The backend will start at: **http://localhost:8000**

API Documentation:
- Swagger UI: **http://localhost:8000/docs**
- ReDoc: **http://localhost:8000/redoc**

---

## 🎨 Frontend Setup

### 1. Install Dependencies

```bash
# From project root
npm install
# or
pnpm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_URL=http://localhost:8000
```

### 3. Run the Frontend

```bash
npm run dev
# or
pnpm run dev
```

The frontend will start at: **http://localhost:5173**

---

## 🔐 Authentication Flow

1. **Signup**: User creates an account with name, email, and password
2. **Login**: User logs in with email and password
3. **Token Storage**: JWT token is stored in localStorage
4. **Protected Routes**: All app routes require authentication
5. **Logout**: Token is removed from localStorage

### Test User Creation

1. Go to http://localhost:5173/login
2. Click "Sign up"
3. Fill in:
   - **Name**: John Doe
   - **Email**: john@example.com
   - **Password**: password123
4. Click "Start Sustainable Journey"
5. You'll be automatically logged in and redirected to the dashboard

---

## 📊 Features Overview

### 1. **Dashboard** (`/`)
- Sustainability score overview
- Category-wise emissions breakdown
- Recent activities
- Goals progress tracking

### 2. **Data Entry** (`/data-entry`)
- Add consumption data for:
  - Travel (car, bus, train, flight)
  - Energy (electricity, natural gas)
  - Water usage
  - Waste (plastic, paper, glass, metal)
- Automatic emission calculation based on predefined factors

### 3. **Time-Rewind Simulation** (`/time-rewind`)
- Select past activities
- Simulate eco-friendly alternatives
- View potential emission savings
- See percentage reduction

### 4. **Impact Planner** (`/impact-planner`)
- Create carbon payback plans
- Set monthly reduction targets
- Track progress over duration

### 5. **Recommendations** (`/recommendations`)
- AI-powered sustainability tips
- Priority-based suggestions (High/Medium/Low)
- Category-specific recommendations
- Generated based on user's emission patterns

### 6. **Habit Detection** (`/habit-detection`)
- Automatically detect recurring behaviors
- Frequency analysis
- Risk level classification
- Identify high-impact habits

### 7. **Digital Twin** (`/digital-twin`)
- Energy consumption simulation
- Compare baseline vs. optimized usage
- Visualize potential savings
- Virtual home energy modeling

### 8. **Daily Report** (`/daily-report`)
- Daily summary of activities
- Emissions breakdown
- Trends and comparisons
- Actionable insights

### 9. **Goals** (`/goals`)
- Create sustainability goals
- Track progress
- Set deadlines
- Update achievements

### 10. **Reports** (`/reports`)
- Comprehensive analytics
- Historical data visualization
- Export capabilities
- Custom date ranges

### 11. **Profile** (`/profile`)
- User account information
- Settings and preferences
- Account management

---

## 🔧 API Endpoints

### Authentication
```
POST   /auth/signup       Create new account
POST   /auth/login        Login and get JWT token
GET    /auth/me           Get current user info
```

### Data Management
```
POST   /data/add          Add consumption data
GET    /data/get          Get consumption data (with days filter)
```

### Analytics & Intelligence
```
GET    /dashboard         Get dashboard summary
GET    /recommendations   Get personalized recommendations
GET    /habits            Get detected habits
GET    /reports           Get comprehensive reports
POST   /simulate          Simulate alternative activities
```

### Planning
```
POST   /payback           Create payback plan
GET    /payback           Get user's payback plans
POST   /digital-twin      Create energy simulation
GET    /digital-twin      Get user's simulations
```

### Goals
```
POST   /goals             Create a new goal
GET    /goals             Get all user goals
PATCH  /goals/{id}        Update goal progress
DELETE /goals/{id}        Delete a goal
```

---

## 🧪 Testing the Integration

### 1. Test Backend Health
```bash
curl http://localhost:8000/health
```

Expected response:
```json
{"status": "healthy"}
```

### 2. Test User Signup
```bash
curl -X POST http://localhost:8000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "testpass123"
  }'
```

### 3. Test Login
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=test@example.com&password=testpass123"
```

### 4. Test Protected Endpoint
```bash
# Replace YOUR_TOKEN with the access_token from login
curl -X GET http://localhost:8000/dashboard \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📈 Emission Factors

The system uses these emission factors (kg CO2):

| Activity | Factor | Unit |
|----------|--------|------|
| Car | 0.21 | kg/km |
| Bus | 0.05 | kg/km |
| Train | 0.03 | kg/km |
| Flight | 0.25 | kg/km |
| Motorcycle | 0.15 | kg/km |
| Electricity | 0.82 | kg/kWh |
| Natural Gas | 0.18 | kg/kWh |
| Water | 0.001 | kg/L |
| Plastic | 6.0 | kg/kg |
| Paper | 1.5 | kg/kg |
| Glass | 0.5 | kg/kg |
| Metal | 2.5 | kg/kg |
| Food Waste | 0.3 | kg/kg |

---

## 🛠️ Development Tips

### Frontend Development
```bash
# Hot reload is enabled by default
npm run dev

# Build for production
npm run build
```

### Backend Development
```bash
# Auto-reload enabled
python main.py

# Or use uvicorn directly with reload
uvicorn main:app --reload --port 8000
```

### Database Migrations
If you make changes to models:
```bash
# The app creates tables automatically on startup
# For production, use Alembic for migrations:
pip install alembic
alembic init migrations
```

---

## 🐛 Troubleshooting

### Issue: Database connection error
**Solution**: Check your DATABASE_URL in `backend/.env` and ensure PostgreSQL is running

### Issue: CORS errors in frontend
**Solution**: Ensure FRONTEND_URL in `backend/.env` matches your frontend URL

### Issue: 401 Unauthorized errors
**Solution**: Token might be expired. Logout and login again

### Issue: Module not found
**Solution**: 
- Frontend: Run `npm install`
- Backend: Run `pip install -r requirements.txt`

### Issue: Port already in use
**Solution**: 
- Frontend: Change port in `vite.config.ts`
- Backend: Change port in `main.py` or kill the process using the port

---

## 🚢 Production Deployment

### Frontend (Vercel/Netlify)
1. Build the app: `npm run build`
2. Deploy the `dist` folder
3. Set environment variable: `VITE_API_URL=https://your-api-domain.com`

### Backend (Railway/Render/DigitalOcean)
1. Set environment variables:
   - `DATABASE_URL` (use production database)
   - `SECRET_KEY` (generate secure key)
   - `FRONTEND_URL` (your frontend domain)
2. Deploy the `backend` folder
3. Ensure PostgreSQL database is provisioned

### Database (Production)
- Use managed PostgreSQL (Railway, Supabase, AWS RDS)
- Enable SSL connections
- Set up backups
- Use connection pooling

---

## 📝 Project Structure

```
/
├── backend/                    # FastAPI Backend
│   ├── main.py                # Entry point
│   ├── models.py              # Database models
│   ├── routes.py              # API routes
│   ├── services.py            # Business logic
│   ├── auth.py                # Authentication
│   ├── database.py            # Database config
│   ├── schemas.py             # Pydantic schemas
│   ├── requirements.txt       # Python dependencies
│   └── README.md             # Backend documentation
│
├── src/
│   ├── app/
│   │   ├── App.tsx           # Main app component
│   │   ├── routes.tsx        # React Router config
│   │   ├── context/
│   │   │   ├── AuthContext.tsx          # Auth state
│   │   │   └── SustainabilityContext.tsx # App state
│   │   ├── services/
│   │   │   └── api.ts        # Backend API calls
│   │   ├── components/
│   │   │   ├── Layout.tsx    # Main layout
│   │   │   ├── ProtectedRoute.tsx  # Route guard
│   │   │   └── ui/           # UI components
│   │   └── pages/            # All page components
│   └── styles/               # Global styles
│
├── package.json              # Frontend dependencies
├── .env.example             # Frontend env template
└── INTEGRATION_README.md    # This file
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📄 License

This project is for educational purposes.

---

## 🎉 Success!

If you've followed all the steps, you should now have:
- ✅ Backend running on http://localhost:8000
- ✅ Frontend running on http://localhost:5173
- ✅ PostgreSQL database connected
- ✅ Full authentication working
- ✅ All features integrated

**Start tracking your sustainability journey! 🌍🌱**

---

## 📧 Need Help?

Check the API documentation at http://localhost:8000/docs for detailed endpoint information.
