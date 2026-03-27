# Personal Sustainability Time-Machine Backend

FastAPI backend for the Personal Sustainability Time-Machine application.

## Setup Instructions

### 1. Install PostgreSQL

Make sure PostgreSQL is installed and running on your system.

### 2. Create Database

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE sustainability_db;

# Exit
\q
```

### 3. Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Edit `.env` file:
```
DATABASE_URL=postgresql://username:password@localhost:5432/sustainability_db
SECRET_KEY=your-super-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
FRONTEND_URL=http://localhost:5173
```

### 5. Run the Backend

```bash
python main.py
```

The API will be available at: `http://localhost:8000`

API Documentation (Swagger): `http://localhost:8000/docs`

## API Endpoints

### Authentication
- `POST /auth/signup` - Create new user account
- `POST /auth/login` - Login and get access token
- `GET /auth/me` - Get current user info

### Data Management
- `POST /data/add` - Add consumption data
- `GET /data/get` - Get consumption data

### Analytics
- `GET /dashboard` - Get dashboard data
- `GET /reports` - Get comprehensive reports
- `POST /simulate` - Simulate alternative activities
- `GET /recommendations` - Get personalized recommendations
- `GET /habits` - Detect and get user habits

### Planning
- `POST /payback` - Create payback plan
- `GET /payback` - Get payback plans
- `POST /digital-twin` - Create energy simulation
- `GET /digital-twin` - Get energy simulations

### Goals
- `POST /goals` - Create a goal
- `GET /goals` - Get all goals
- `PATCH /goals/{id}` - Update goal progress
- `DELETE /goals/{id}` - Delete a goal

## Database Schema

The backend uses PostgreSQL with the following tables:
- `users` - User accounts
- `consumption_data` - Activity and emission data
- `recommendations` - AI-generated suggestions
- `habit_data` - Detected user habits
- `payback_plans` - Emission reduction plans
- `energy_simulations` - Digital twin simulations
- `goals` - User sustainability goals

## Emission Factors

The system uses the following emission factors (kg CO2):
- Car: 0.21 kg/km
- Bus: 0.05 kg/km
- Train: 0.03 kg/km
- Flight: 0.25 kg/km
- Electricity: 0.82 kg/kWh
- Water: 0.001 kg/L
- Plastic: 6.0 kg/kg

## Development

To run in development mode with auto-reload:
```bash
uvicorn main:app --reload --port 8000
```

## Testing

You can test the API using:
1. Swagger UI at `http://localhost:8000/docs`
2. ReDoc at `http://localhost:8000/redoc`
3. Any API client (Postman, Insomnia, etc.)
