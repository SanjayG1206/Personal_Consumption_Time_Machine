from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    name: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# Consumption Data Schemas
class ConsumptionDataCreate(BaseModel):
    category: str
    activity: str
    quantity: float
    unit: str
    date: Optional[datetime] = None

class ConsumptionDataResponse(BaseModel):
    id: int
    user_id: int
    category: str
    activity: str
    quantity: float
    unit: str
    date: datetime
    emission_factor: float
    emission_value: float
    
    class Config:
        from_attributes = True

# Recommendation Schemas
class RecommendationResponse(BaseModel):
    id: int
    suggestion: str
    category: str
    priority: str
    created_at: datetime
    
    class Config:
        from_attributes = True

# Habit Data Schemas
class HabitDataResponse(BaseModel):
    id: int
    habit_type: str
    frequency: float
    risk_level: str
    created_at: datetime
    
    class Config:
        from_attributes = True

# Payback Plan Schemas
class PaybackPlanCreate(BaseModel):
    total_debt: float
    duration: int

class PaybackPlanResponse(BaseModel):
    id: int
    total_debt: float
    monthly_target: float
    duration: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Energy Simulation Schemas
class EnergySimulationCreate(BaseModel):
    baseline_energy: float
    optimized_energy: float

class EnergySimulationResponse(BaseModel):
    id: int
    baseline_energy: float
    optimized_energy: float
    energy_saved: float
    created_at: datetime
    
    class Config:
        from_attributes = True

# Goal Schemas
class GoalCreate(BaseModel):
    title: str
    target: float
    unit: str
    deadline: datetime

class GoalUpdate(BaseModel):
    current: float

class GoalResponse(BaseModel):
    id: int
    title: str
    target: float
    current: float
    unit: str
    deadline: datetime
    created_at: datetime
    
    class Config:
        from_attributes = True

# Simulation Request/Response
class SimulationRequest(BaseModel):
    data_ids: List[int]

class SimulationResponse(BaseModel):
    original_emissions: float
    alternative_emissions: float
    savings: float
    percentage_reduction: float
    alternatives: List[dict]

# Dashboard Response
class DashboardResponse(BaseModel):
    sustainability_score: float
    total_emissions: float
    category_breakdown: dict
    recent_activities: List[ConsumptionDataResponse]
    goals_progress: List[GoalResponse]
