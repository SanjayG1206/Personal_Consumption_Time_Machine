from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    consumption_data = relationship("ConsumptionData", back_populates="user", cascade="all, delete-orphan")
    recommendations = relationship("Recommendation", back_populates="user", cascade="all, delete-orphan")
    habits = relationship("HabitData", back_populates="user", cascade="all, delete-orphan")
    payback_plans = relationship("PaybackPlan", back_populates="user", cascade="all, delete-orphan")
    energy_simulations = relationship("EnergySimulation", back_populates="user", cascade="all, delete-orphan")
    goals = relationship("Goal", back_populates="user", cascade="all, delete-orphan")

class ConsumptionData(Base):
    __tablename__ = "consumption_data"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    category = Column(String, nullable=False)  # travel, energy, water, waste
    activity = Column(String, nullable=False)
    quantity = Column(Float, nullable=False)
    unit = Column(String, nullable=False)
    date = Column(DateTime, default=datetime.utcnow)
    emission_factor = Column(Float, nullable=False)
    emission_value = Column(Float, nullable=False)
    
    # Relationship
    user = relationship("User", back_populates="consumption_data")

class Recommendation(Base):
    __tablename__ = "recommendations"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    suggestion = Column(Text, nullable=False)
    category = Column(String, nullable=False)
    priority = Column(String, nullable=False)  # high, medium, low
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationship
    user = relationship("User", back_populates="recommendations")

class HabitData(Base):
    __tablename__ = "habit_data"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    habit_type = Column(String, nullable=False)
    frequency = Column(Float, nullable=False)
    risk_level = Column(String, nullable=False)  # high, medium, low
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationship
    user = relationship("User", back_populates="habits")

class PaybackPlan(Base):
    __tablename__ = "payback_plans"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    total_debt = Column(Float, nullable=False)
    monthly_target = Column(Float, nullable=False)
    duration = Column(Integer, nullable=False)  # in months
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationship
    user = relationship("User", back_populates="payback_plans")

class EnergySimulation(Base):
    __tablename__ = "energy_simulations"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    baseline_energy = Column(Float, nullable=False)
    optimized_energy = Column(Float, nullable=False)
    energy_saved = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationship
    user = relationship("User", back_populates="energy_simulations")

class Goal(Base):
    __tablename__ = "goals"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    target = Column(Float, nullable=False)
    current = Column(Float, default=0)
    unit = Column(String, nullable=False)
    deadline = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationship
    user = relationship("User", back_populates="goals")
