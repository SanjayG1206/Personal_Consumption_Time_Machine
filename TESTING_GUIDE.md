# 🧪 Testing Guide

Complete guide for testing your Personal Sustainability Time-Machine application.

---

## 🏥 Health Checks

### Backend Health Check

Run the automated health check script:

```bash
cd backend
python3 health_check.py
```

This will verify:
- ✅ Python dependencies installed
- ✅ Environment variables configured
- ✅ Database connectivity
- ✅ Database tables created

---

## 🚀 Quick Test Sequence

### 1. Backend API Test

```bash
# Health endpoint
curl http://localhost:8000/health

# Expected: {"status": "healthy"}
```

```bash
# Root endpoint
curl http://localhost:8000/

# Expected: {"message": "Personal Sustainability Time-Machine API", ...}
```

### 2. User Registration Test

```bash
curl -X POST http://localhost:8000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "testpass123"
  }'

# Expected: User object with id, name, email
```

### 3. Login Test

```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=test@example.com&password=testpass123"

# Expected: {"access_token": "...", "token_type": "bearer"}
# SAVE THIS TOKEN for next tests
```

### 4. Protected Endpoint Test

```bash
# Replace YOUR_TOKEN with the token from login
export TOKEN="your_access_token_here"

curl -X GET http://localhost:8000/auth/me \
  -H "Authorization: Bearer $TOKEN"

# Expected: User info (id, name, email, created_at)
```

### 5. Add Data Test

```bash
curl -X POST http://localhost:8000/data/add \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "category": "travel",
    "activity": "car",
    "quantity": 25,
    "unit": "km"
  }'

# Expected: Data entry with calculated emissions
```

### 6. Dashboard Test

```bash
curl -X GET http://localhost:8000/dashboard \
  -H "Authorization: Bearer $TOKEN"

# Expected: Dashboard data with score, emissions, breakdown
```

---

## 🌐 Frontend Testing

### Manual Test Workflow

#### 1. **Login Page** (http://localhost:5173/login)

**Test Signup:**
- [ ] Click "Sign up"
- [ ] Fill in name, email, password
- [ ] Submit form
- [ ] Check for success message
- [ ] Auto-redirect to dashboard

**Test Login:**
- [ ] Fill in email and password
- [ ] Click "Sign In"
- [ ] Check for success message
- [ ] Redirect to dashboard

**Test Validation:**
- [ ] Try empty fields (should show validation)
- [ ] Try invalid email format
- [ ] Try short password (< 6 chars)

#### 2. **Dashboard** (http://localhost:5173/)

**Check displays:**
- [ ] Sustainability score shows
- [ ] Category breakdown chart renders
- [ ] Recent activities list
- [ ] Goals progress cards
- [ ] Navigation sidebar works

#### 3. **Data Entry** (http://localhost:5173/data-entry)

**Add Travel Data:**
- [ ] Select "Travel" category
- [ ] Choose activity (car, bus, train)
- [ ] Enter quantity
- [ ] Select unit
- [ ] Submit
- [ ] Check success toast
- [ ] Verify data appears in dashboard

**Add Energy Data:**
- [ ] Select "Energy" category
- [ ] Choose "Electricity"
- [ ] Enter kWh value
- [ ] Submit and verify

**Add Water Data:**
- [ ] Select "Water" category
- [ ] Enter liters
- [ ] Submit and verify

**Add Waste Data:**
- [ ] Select "Waste" category
- [ ] Choose waste type
- [ ] Enter kg
- [ ] Submit and verify

#### 4. **Time-Rewind** (http://localhost:5173/time-rewind)

**Test Simulation:**
- [ ] Past activities load
- [ ] Select activities
- [ ] Click "Run Simulation"
- [ ] View alternative suggestions
- [ ] Check emission savings calculation
- [ ] Verify percentage reduction

#### 5. **Recommendations** (http://localhost:5173/recommendations)

**Check recommendations:**
- [ ] Recommendations generate automatically
- [ ] Priority levels show (High/Medium/Low)
- [ ] Category-specific tips display
- [ ] Refresh button works

#### 6. **Habit Detection** (http://localhost:5173/habit-detection)

**Verify habits:**
- [ ] Habits list loads
- [ ] Frequency calculation shows
- [ ] Risk levels display correctly
- [ ] Charts render properly

#### 7. **Goals** (http://localhost:5173/goals)

**Test Goal Creation:**
- [ ] Click "Add Goal"
- [ ] Fill in title, target, unit, deadline
- [ ] Submit
- [ ] Goal appears in list

**Test Goal Update:**
- [ ] Update progress on existing goal
- [ ] Check progress bar updates
- [ ] Verify completion percentage

**Test Goal Deletion:**
- [ ] Delete a goal
- [ ] Confirm removal from list

#### 8. **Digital Twin** (http://localhost:5173/digital-twin)

**Test Simulation:**
- [ ] Enter baseline energy
- [ ] Enter optimized energy
- [ ] Run simulation
- [ ] View energy saved
- [ ] Check efficiency percentage

#### 9. **Reports** (http://localhost:5173/reports)

**Verify reports:**
- [ ] Charts load
- [ ] Data matches dashboard
- [ ] Date range filters work
- [ ] Export button present

#### 10. **Profile** (http://localhost:5173/profile)

**Check profile:**
- [ ] User info displays
- [ ] Settings available
- [ ] Account details correct

#### 11. **Logout**

**Test logout:**
- [ ] Click logout button in header
- [ ] Redirect to login page
- [ ] Cannot access protected pages
- [ ] Token removed from localStorage

---

## 🔍 Browser DevTools Testing

### Console Checks
```javascript
// Open browser console (F12)

// Check if token is stored
console.log(localStorage.getItem('auth_token'))

// Check for errors
// Should see no red errors in console
```

### Network Tab
- [ ] API calls show 200 status
- [ ] Authorization header present
- [ ] Response data correct
- [ ] No CORS errors

---

## 📊 Data Validation Tests

### Emission Calculations

**Test data:**
```
Activity: Car, 25 km
Expected: 25 * 0.21 = 5.25 kg CO2

Activity: Electricity, 10 kWh
Expected: 10 * 0.82 = 8.2 kg CO2

Activity: Plastic, 0.5 kg
Expected: 0.5 * 6.0 = 3.0 kg CO2
```

**Verify:**
- [ ] Backend calculates correctly
- [ ] Frontend displays correct values
- [ ] Dashboard totals match

---

## 🎯 Integration Tests

### Full User Journey

1. **Signup** → Success
2. **Auto-login** → Dashboard loads
3. **Add travel data** → Shows in recent activities
4. **Add energy data** → Score updates
5. **View recommendations** → Tips generated
6. **Create goal** → Appears in dashboard
7. **Run simulation** → Savings calculated
8. **View reports** → Data visualized
9. **Logout** → Back to login

**Duration:** ~5 minutes

---

## 🐛 Error Handling Tests

### Test Error Cases

**Backend Errors:**
```bash
# Invalid credentials
curl -X POST http://localhost:8000/auth/login \
  -d "username=wrong@email.com&password=wrongpass"
# Expected: 401 Unauthorized

# Expired token
curl -X GET http://localhost:8000/dashboard \
  -H "Authorization: Bearer invalid_token"
# Expected: 401 Unauthorized

# Missing required field
curl -X POST http://localhost:8000/data/add \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}'
# Expected: 422 Validation Error
```

**Frontend Error Handling:**
- [ ] Wrong password shows error toast
- [ ] Network error shows message
- [ ] Invalid form data shows validation
- [ ] Expired token redirects to login

---

## 📱 Responsive Testing

### Desktop (1920x1080)
- [ ] Sidebar full width
- [ ] Charts properly sized
- [ ] All elements visible
- [ ] No horizontal scroll

### Tablet (768x1024)
- [ ] Layout adapts
- [ ] Sidebar toggleable
- [ ] Charts responsive
- [ ] Touch-friendly buttons

### Mobile (375x667)
- [ ] Mobile menu works
- [ ] Forms usable
- [ ] Charts scale down
- [ ] Text readable

---

## 🎨 UI/UX Tests

### Visual Checks
- [ ] Colors consistent (green theme)
- [ ] Fonts load correctly
- [ ] Icons display properly
- [ ] Animations smooth
- [ ] Loading states show
- [ ] Dark mode works

### Accessibility
- [ ] Tab navigation works
- [ ] Form labels present
- [ ] Error messages clear
- [ ] Contrast ratios good
- [ ] Focus indicators visible

---

## 🚦 Performance Tests

### Load Times
- [ ] Login page < 2s
- [ ] Dashboard < 3s
- [ ] Data entry instant
- [ ] Charts render < 1s

### API Response Times
```bash
# Use 'time' command
time curl http://localhost:8000/dashboard \
  -H "Authorization: Bearer $TOKEN"

# Should complete in < 500ms
```

---

## 📝 Sample Data Testing

### Create Demo Account

```bash
cd backend
python3 seed_data.py
```

**Demo credentials:**
```
Email: demo@sustainability.com
Password: demo123
```

**What's included:**
- 16 consumption entries
- 3 goals
- Data over 7 days
- Mixed categories

**Test with demo account:**
- [ ] Dashboard shows data
- [ ] Charts populated
- [ ] Recommendations generated
- [ ] Habits detected
- [ ] Goals tracking

---

## ✅ Test Checklist Summary

### Must Pass
- [x] Backend health check
- [x] Database connectivity
- [x] User signup/login
- [x] Add data entries
- [x] View dashboard
- [x] Generate recommendations
- [x] Create goals
- [x] Run simulations
- [x] Logout

### Should Pass
- [ ] All emission calculations correct
- [ ] No console errors
- [ ] Responsive on all devices
- [ ] Dark mode works
- [ ] All charts render
- [ ] Error handling works

### Nice to Have
- [ ] Fast load times
- [ ] Smooth animations
- [ ] Accessibility features
- [ ] Export functionality

---

## 🆘 Troubleshooting Tests

If a test fails, check:

1. **Backend not responding**
   - Is server running? (`python main.py`)
   - Check port 8000 not in use
   - Check logs for errors

2. **Database errors**
   - Is PostgreSQL running?
   - Tables created? (`python init_db.py`)
   - Connection string correct?

3. **Frontend errors**
   - Is dev server running? (`npm run dev`)
   - Check API URL in .env
   - Clear browser cache
   - Check browser console

4. **Authentication fails**
   - Token expired? (logout/login)
   - CORS configured?
   - Secret key set?

---

## 🎉 Success Criteria

**All tests pass when:**
- ✅ User can signup and login
- ✅ Data can be added and displayed
- ✅ Dashboard shows correct calculations
- ✅ Recommendations are generated
- ✅ Simulations work
- ✅ Goals can be managed
- ✅ No critical errors in console
- ✅ Responsive on mobile/desktop

---

**Ready to test? Start with the health check!**

```bash
cd backend
python3 health_check.py
```
