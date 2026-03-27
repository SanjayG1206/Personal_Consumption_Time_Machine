# 📚 API Reference

Complete API documentation for the Personal Sustainability Time-Machine backend.

**Base URL:** `http://localhost:8000`

**Interactive Docs:** http://localhost:8000/docs

---

## 🔐 Authentication

All endpoints except `/auth/signup` and `/auth/login` require authentication.

**Header:**
```
Authorization: Bearer <access_token>
```

---

## 📋 Endpoints

### Authentication Endpoints

#### 1. Sign Up
Create a new user account.

```http
POST /auth/signup
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass123"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2026-03-27T10:00:00"
}
```

**Errors:**
- `400` - Email already registered

---

#### 2. Login
Authenticate and get access token.

```http
POST /auth/login
Content-Type: application/x-www-form-urlencoded
```

**Request Body:**
```
username=john@example.com&password=securepass123
```

**Response:** `200 OK`
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

**Errors:**
- `401` - Incorrect email or password

---

#### 3. Get Current User
Get authenticated user information.

```http
GET /auth/me
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2026-03-27T10:00:00"
}
```

**Errors:**
- `401` - Invalid or expired token

---

### Data Management Endpoints

#### 4. Add Consumption Data
Add a new consumption entry.

```http
POST /data/add
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "category": "travel",
  "activity": "car",
  "quantity": 25,
  "unit": "km",
  "date": "2026-03-27T10:00:00"  // optional
}
```

**Categories:**
- `travel` - Activities: car, bus, train, flight, motorcycle
- `energy` - Activities: electricity, natural_gas
- `water` - Activities: water
- `waste` - Activities: plastic, paper, glass, metal, food_waste

**Response:** `200 OK`
```json
{
  "id": 1,
  "user_id": 1,
  "category": "travel",
  "activity": "car",
  "quantity": 25,
  "unit": "km",
  "date": "2026-03-27T10:00:00",
  "emission_factor": 0.21,
  "emission_value": 5.25
}
```

---

#### 5. Get Consumption Data
Retrieve consumption data for a time period.

```http
GET /data/get?days=30
Authorization: Bearer <token>
```

**Query Parameters:**
- `days` (optional) - Number of days to retrieve (default: 30)

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "user_id": 1,
    "category": "travel",
    "activity": "car",
    "quantity": 25,
    "unit": "km",
    "date": "2026-03-27T10:00:00",
    "emission_factor": 0.21,
    "emission_value": 5.25
  }
]
```

---

### Analytics Endpoints

#### 6. Get Dashboard Data
Retrieve comprehensive dashboard information.

```http
GET /dashboard
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "sustainability_score": 72.5,
  "total_emissions": 45.8,
  "category_breakdown": {
    "travel": 25.5,
    "energy": 15.3,
    "water": 0.5,
    "waste": 4.5
  },
  "recent_activities": [...],
  "goals_progress": [...]
}
```

---

#### 7. Get Recommendations
Get AI-powered sustainability recommendations.

```http
GET /recommendations
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "suggestion": "Consider using public transportation...",
    "category": "travel",
    "priority": "high",
    "created_at": "2026-03-27T10:00:00"
  }
]
```

**Priority Levels:**
- `high` - Critical recommendations
- `medium` - Important suggestions
- `low` - Optional improvements

---

#### 8. Detect Habits
Analyze and detect user behavior patterns.

```http
GET /habits
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "habit_type": "car",
    "frequency": 0.85,
    "risk_level": "high",
    "created_at": "2026-03-27T10:00:00"
  }
]
```

**Risk Levels:**
- `high` - Frequency > 0.7
- `medium` - Frequency 0.3-0.7
- `low` - Frequency < 0.3

---

#### 9. Get Reports
Generate comprehensive sustainability reports.

```http
GET /reports?days=30
Authorization: Bearer <token>
```

**Query Parameters:**
- `days` (optional) - Report period (default: 30)

**Response:** `200 OK`
```json
{
  "sustainability_score": 72.5,
  "category_breakdown": {
    "travel": 25.5,
    "energy": 15.3
  },
  "total_entries": 50,
  "total_emissions": 45.8,
  "period_days": 30
}
```

---

### Simulation Endpoints

#### 10. Simulate Alternatives
Run time-rewind simulation with eco-friendly alternatives.

```http
POST /simulate
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "data_ids": [1, 2, 3]
}
```

**Response:** `200 OK`
```json
{
  "original_emissions": 15.75,
  "alternative_emissions": 4.5,
  "savings": 11.25,
  "percentage_reduction": 71.4,
  "alternatives": [
    {
      "original_activity": "car",
      "alternative_activity": "bus",
      "original_emission": 5.25,
      "alternative_emission": 1.25,
      "savings": 4.0
    }
  ]
}
```

---

### Planning Endpoints

#### 11. Create Payback Plan
Create a carbon emission payback plan.

```http
POST /payback
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "total_debt": 100,
  "duration": 6
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "total_debt": 100,
  "monthly_target": 16.67,
  "duration": 6,
  "created_at": "2026-03-27T10:00:00"
}
```

---

#### 12. Get Payback Plans
Retrieve user's payback plans.

```http
GET /payback
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "total_debt": 100,
    "monthly_target": 16.67,
    "duration": 6,
    "created_at": "2026-03-27T10:00:00"
  }
]
```

---

#### 13. Create Energy Simulation
Create a digital twin energy simulation.

```http
POST /digital-twin
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "baseline_energy": 500,
  "optimized_energy": 350
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "baseline_energy": 500,
  "optimized_energy": 350,
  "energy_saved": 150,
  "created_at": "2026-03-27T10:00:00"
}
```

---

#### 14. Get Energy Simulations
Retrieve energy simulations.

```http
GET /digital-twin
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "baseline_energy": 500,
    "optimized_energy": 350,
    "energy_saved": 150,
    "created_at": "2026-03-27T10:00:00"
  }
]
```

---

### Goal Endpoints

#### 15. Create Goal
Create a new sustainability goal.

```http
POST /goals
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Reduce carbon emissions by 20%",
  "target": 100,
  "unit": "kg CO2",
  "deadline": "2026-12-31T23:59:59"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Reduce carbon emissions by 20%",
  "target": 100,
  "current": 0,
  "unit": "kg CO2",
  "deadline": "2026-12-31T23:59:59",
  "created_at": "2026-03-27T10:00:00"
}
```

---

#### 16. Get Goals
Retrieve all user goals.

```http
GET /goals
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Reduce carbon emissions by 20%",
    "target": 100,
    "current": 45,
    "unit": "kg CO2",
    "deadline": "2026-12-31T23:59:59",
    "created_at": "2026-03-27T10:00:00"
  }
]
```

---

#### 17. Update Goal
Update goal progress.

```http
PATCH /goals/{goal_id}
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "current": 65
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Reduce carbon emissions by 20%",
  "target": 100,
  "current": 65,
  "unit": "kg CO2",
  "deadline": "2026-12-31T23:59:59",
  "created_at": "2026-03-27T10:00:00"
}
```

**Errors:**
- `404` - Goal not found

---

#### 18. Delete Goal
Delete a goal.

```http
DELETE /goals/{goal_id}
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "message": "Goal deleted successfully"
}
```

**Errors:**
- `404` - Goal not found

---

### Utility Endpoints

#### 19. Root
API information.

```http
GET /
```

**Response:** `200 OK`
```json
{
  "message": "Personal Sustainability Time-Machine API",
  "version": "1.0.0",
  "status": "running"
}
```

---

#### 20. Health Check
Check API health status.

```http
GET /health
```

**Response:** `200 OK`
```json
{
  "status": "healthy"
}
```

---

## 📊 Emission Factors Reference

| Activity | Category | Factor | Unit |
|----------|----------|--------|------|
| car | travel | 0.21 | kg CO2/km |
| bus | travel | 0.05 | kg CO2/km |
| train | travel | 0.03 | kg CO2/km |
| flight | travel | 0.25 | kg CO2/km |
| motorcycle | travel | 0.15 | kg CO2/km |
| electricity | energy | 0.82 | kg CO2/kWh |
| natural_gas | energy | 0.18 | kg CO2/kWh |
| water | water | 0.001 | kg CO2/L |
| plastic | waste | 6.0 | kg CO2/kg |
| paper | waste | 1.5 | kg CO2/kg |
| glass | waste | 0.5 | kg CO2/kg |
| metal | waste | 2.5 | kg CO2/kg |
| food_waste | waste | 0.3 | kg CO2/kg |

---

## ❌ Error Responses

### Common Error Codes

**400 Bad Request**
```json
{
  "detail": "Email already registered"
}
```

**401 Unauthorized**
```json
{
  "detail": "Could not validate credentials"
}
```

**404 Not Found**
```json
{
  "detail": "Goal not found"
}
```

**422 Validation Error**
```json
{
  "detail": [
    {
      "loc": ["body", "quantity"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

---

## 🔧 Request Examples

### Using cURL

```bash
# Set token variable
export TOKEN="your_token_here"

# Get dashboard
curl -X GET http://localhost:8000/dashboard \
  -H "Authorization: Bearer $TOKEN"

# Add data
curl -X POST http://localhost:8000/data/add \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "category": "travel",
    "activity": "car",
    "quantity": 25,
    "unit": "km"
  }'
```

### Using JavaScript (Fetch)

```javascript
const token = localStorage.getItem('auth_token');

// Get dashboard
const response = await fetch('http://localhost:8000/dashboard', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const data = await response.json();
```

### Using Python (requests)

```python
import requests

token = "your_token_here"
headers = {"Authorization": f"Bearer {token}"}

# Get dashboard
response = requests.get(
    "http://localhost:8000/dashboard",
    headers=headers
)

data = response.json()
```

---

## 📝 Rate Limiting

Currently, no rate limiting is implemented. For production:
- Consider implementing rate limiting
- Use tools like `slowapi` for FastAPI
- Recommended: 100 requests per minute per user

---

## 🔒 Security Notes

- Passwords are hashed using bcrypt
- JWT tokens expire after 30 minutes (configurable)
- CORS is configured for frontend origin
- SQL injection protection via SQLAlchemy ORM
- Input validation via Pydantic schemas

---

## 📚 Additional Resources

- **Interactive Docs:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc
- **OpenAPI JSON:** http://localhost:8000/openapi.json

---

**For more details, visit the interactive Swagger documentation at `/docs`**
