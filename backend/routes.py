from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from datetime import timedelta
from typing import List

from database import get_db
from models import User, Goal
import schemas
import auth
import services

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# Dependency to get current user
async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = schemas.TokenData(email=email)
    except JWTError:
        raise credentials_exception
    
    user = auth.get_user_by_email(db, email=token_data.email)
    if user is None:
        raise credentials_exception
    return user

# Auth Routes
@router.post("/auth/signup", response_model=schemas.UserResponse)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    """Create a new user account"""
    # Check if user already exists
    db_user = auth.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create user
    new_user = auth.create_user(db, name=user.name, email=user.email, password=user.password)
    return new_user

@router.post("/auth/login", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """Login and get access token"""
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/auth/me", response_model=schemas.UserResponse)
def get_current_user_info(current_user: User = Depends(get_current_user)):
    """Get current user information"""
    return current_user

# Data Routes
@router.post("/data/add", response_model=schemas.ConsumptionDataResponse)
def add_data(
    data: schemas.ConsumptionDataCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Add consumption data"""
    return services.add_consumption_data(
        db, current_user.id, data.category, data.activity,
        data.quantity, data.unit, data.date
    )

@router.get("/data/get", response_model=List[schemas.ConsumptionDataResponse])
def get_data(
    days: int = 30,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's consumption data"""
    return services.get_user_consumption_data(db, current_user.id, days)

# Simulation Routes
@router.post("/simulate", response_model=schemas.SimulationResponse)
def simulate(
    request: schemas.SimulationRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Simulate alternative activities"""
    return services.simulate_alternatives(db, current_user.id, request.data_ids)

# Recommendation Routes
@router.get("/recommendations", response_model=List[schemas.RecommendationResponse])
def get_recommendations(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get personalized recommendations"""
    return services.generate_recommendations(db, current_user.id)

# Habit Routes
@router.get("/habits", response_model=List[schemas.HabitDataResponse])
def get_habits(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Detect and get user habits"""
    return services.detect_habits(db, current_user.id)

# Payback Plan Routes
@router.post("/payback", response_model=schemas.PaybackPlanResponse)
def create_payback(
    plan: schemas.PaybackPlanCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a payback plan"""
    return services.create_payback_plan(db, current_user.id, plan.total_debt, plan.duration)

@router.get("/payback", response_model=List[schemas.PaybackPlanResponse])
def get_payback(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's payback plans"""
    return db.query(services.PaybackPlan).filter(
        services.PaybackPlan.user_id == current_user.id
    ).all()

# Digital Twin Routes
@router.post("/digital-twin", response_model=schemas.EnergySimulationResponse)
def create_simulation(
    simulation: schemas.EnergySimulationCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create energy simulation"""
    return services.simulate_energy(
        db, current_user.id,
        simulation.baseline_energy,
        simulation.optimized_energy
    )

@router.get("/digital-twin", response_model=List[schemas.EnergySimulationResponse])
def get_simulations(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's energy simulations"""
    return db.query(services.EnergySimulation).filter(
        services.EnergySimulation.user_id == current_user.id
    ).all()

# Dashboard Routes
@router.get("/dashboard", response_model=schemas.DashboardResponse)
def get_dashboard(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get dashboard data"""
    return services.get_dashboard_data(db, current_user.id)

# Reports Routes
@router.get("/reports")
def get_reports(
    days: int = 30,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get comprehensive reports"""
    data = services.get_user_consumption_data(db, current_user.id, days)
    category_breakdown = services.calculate_category_emissions(db, current_user.id, days)
    score = services.calculate_sustainability_score(db, current_user.id)
    
    return {
        "sustainability_score": score,
        "category_breakdown": category_breakdown,
        "total_entries": len(data),
        "total_emissions": sum(category_breakdown.values()),
        "period_days": days
    }

# Goal Routes
@router.post("/goals", response_model=schemas.GoalResponse)
def create_goal(
    goal: schemas.GoalCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new goal"""
    new_goal = Goal(
        user_id=current_user.id,
        title=goal.title,
        target=goal.target,
        unit=goal.unit,
        deadline=goal.deadline
    )
    db.add(new_goal)
    db.commit()
    db.refresh(new_goal)
    return new_goal

@router.get("/goals", response_model=List[schemas.GoalResponse])
def get_goals(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's goals"""
    return db.query(Goal).filter(Goal.user_id == current_user.id).all()

@router.patch("/goals/{goal_id}", response_model=schemas.GoalResponse)
def update_goal(
    goal_id: int,
    goal_update: schemas.GoalUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update goal progress"""
    goal = db.query(Goal).filter(
        Goal.id == goal_id,
        Goal.user_id == current_user.id
    ).first()
    
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    goal.current = goal_update.current
    db.commit()
    db.refresh(goal)
    return goal

@router.delete("/goals/{goal_id}")
def delete_goal(
    goal_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a goal"""
    goal = db.query(Goal).filter(
        Goal.id == goal_id,
        Goal.user_id == current_user.id
    ).first()
    
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    db.delete(goal)
    db.commit()
    return {"message": "Goal deleted successfully"}
