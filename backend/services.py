from sqlalchemy.orm import Session
from models import ConsumptionData, Recommendation, HabitData, PaybackPlan, EnergySimulation, Goal
from datetime import datetime, timedelta
from typing import List, Dict
from collections import defaultdict

# Emission factors (kg CO2 per unit)
EMISSION_FACTORS = {
    "car": 0.21,  # kg/km
    "bus": 0.05,  # kg/km
    "train": 0.03,  # kg/km
    "flight": 0.25,  # kg/km
    "motorcycle": 0.15,  # kg/km
    "electricity": 0.82,  # kg/kWh
    "natural_gas": 0.18,  # kg/kWh
    "water": 0.001,  # kg/L
    "plastic": 6.0,  # kg/kg
    "paper": 1.5,  # kg/kg
    "glass": 0.5,  # kg/kg
    "metal": 2.5,  # kg/kg
    "food_waste": 0.3,  # kg/kg
}

def get_emission_factor(activity: str) -> float:
    """Get emission factor for an activity"""
    activity_lower = activity.lower().replace(" ", "_")
    return EMISSION_FACTORS.get(activity_lower, 1.0)

def calculate_emission(quantity: float, activity: str) -> float:
    """Calculate emission value"""
    emission_factor = get_emission_factor(activity)
    return quantity * emission_factor

def add_consumption_data(db: Session, user_id: int, category: str, activity: str, 
                        quantity: float, unit: str, date: datetime = None):
    """Add consumption data with emission calculation"""
    if date is None:
        date = datetime.utcnow()
    
    emission_factor = get_emission_factor(activity)
    emission_value = calculate_emission(quantity, activity)
    
    data = ConsumptionData(
        user_id=user_id,
        category=category,
        activity=activity,
        quantity=quantity,
        unit=unit,
        date=date,
        emission_factor=emission_factor,
        emission_value=emission_value
    )
    
    db.add(data)
    db.commit()
    db.refresh(data)
    return data

def get_user_consumption_data(db: Session, user_id: int, days: int = 30):
    """Get user's consumption data for the last N days"""
    start_date = datetime.utcnow() - timedelta(days=days)
    return db.query(ConsumptionData).filter(
        ConsumptionData.user_id == user_id,
        ConsumptionData.date >= start_date
    ).order_by(ConsumptionData.date.desc()).all()

def calculate_category_emissions(db: Session, user_id: int, days: int = 30) -> Dict[str, float]:
    """Calculate total emissions by category"""
    data = get_user_consumption_data(db, user_id, days)
    
    category_totals = defaultdict(float)
    for item in data:
        category_totals[item.category] += item.emission_value
    
    return dict(category_totals)

def generate_recommendations(db: Session, user_id: int):
    """Generate personalized recommendations based on user data"""
    # Clear old recommendations
    db.query(Recommendation).filter(Recommendation.user_id == user_id).delete()
    
    category_emissions = calculate_category_emissions(db, user_id)
    
    # Sort categories by emission value
    sorted_categories = sorted(category_emissions.items(), key=lambda x: x[1], reverse=True)
    
    recommendations_data = []
    
    for category, emission in sorted_categories[:3]:
        if category == "travel" and emission > 10:
            recommendations_data.append({
                "suggestion": "Consider using public transportation or carpooling to reduce your travel emissions significantly.",
                "category": "travel",
                "priority": "high" if emission > 50 else "medium"
            })
        elif category == "energy" and emission > 15:
            recommendations_data.append({
                "suggestion": "Switch to energy-efficient appliances and consider using renewable energy sources.",
                "category": "energy",
                "priority": "high" if emission > 40 else "medium"
            })
        elif category == "waste" and emission > 5:
            recommendations_data.append({
                "suggestion": "Increase recycling efforts and reduce single-use plastics to minimize waste impact.",
                "category": "waste",
                "priority": "high" if emission > 20 else "medium"
            })
        elif category == "water" and emission > 2:
            recommendations_data.append({
                "suggestion": "Install water-saving fixtures and be mindful of water consumption during daily activities.",
                "category": "water",
                "priority": "medium"
            })
    
    # Add general recommendations
    if len(recommendations_data) < 3:
        recommendations_data.append({
            "suggestion": "Track your daily activities consistently to get better insights and personalized recommendations.",
            "category": "general",
            "priority": "low"
        })
    
    # Save recommendations to database
    for rec_data in recommendations_data:
        rec = Recommendation(
            user_id=user_id,
            suggestion=rec_data["suggestion"],
            category=rec_data["category"],
            priority=rec_data["priority"]
        )
        db.add(rec)
    
    db.commit()
    
    return db.query(Recommendation).filter(Recommendation.user_id == user_id).all()

def detect_habits(db: Session, user_id: int):
    """Detect user habits and risk levels"""
    # Clear old habits
    db.query(HabitData).filter(HabitData.user_id == user_id).delete()
    
    # Get data for the last 30 days
    data = get_user_consumption_data(db, user_id, 30)
    
    # Count occurrences by activity
    activity_counts = defaultdict(int)
    for item in data:
        activity_counts[item.activity] += 1
    
    total_days = 30
    habits = []
    
    for activity, count in activity_counts.items():
        frequency = count / total_days
        
        # Determine risk level
        if frequency > 0.7:
            risk_level = "high"
        elif frequency > 0.3:
            risk_level = "medium"
        else:
            risk_level = "low"
        
        habit = HabitData(
            user_id=user_id,
            habit_type=activity,
            frequency=frequency,
            risk_level=risk_level
        )
        db.add(habit)
        habits.append(habit)
    
    db.commit()
    return habits

def create_payback_plan(db: Session, user_id: int, total_debt: float, duration: int):
    """Create a payback plan"""
    monthly_target = total_debt / duration
    
    plan = PaybackPlan(
        user_id=user_id,
        total_debt=total_debt,
        monthly_target=monthly_target,
        duration=duration
    )
    
    db.add(plan)
    db.commit()
    db.refresh(plan)
    return plan

def simulate_energy(db: Session, user_id: int, baseline_energy: float, optimized_energy: float):
    """Simulate energy optimization"""
    energy_saved = baseline_energy - optimized_energy
    
    simulation = EnergySimulation(
        user_id=user_id,
        baseline_energy=baseline_energy,
        optimized_energy=optimized_energy,
        energy_saved=energy_saved
    )
    
    db.add(simulation)
    db.commit()
    db.refresh(simulation)
    return simulation

def simulate_alternatives(db: Session, user_id: int, data_ids: List[int]):
    """Simulate alternative activities with lower emissions"""
    data_items = db.query(ConsumptionData).filter(
        ConsumptionData.user_id == user_id,
        ConsumptionData.id.in_(data_ids)
    ).all()
    
    if not data_items:
        return {
            "original_emissions": 0,
            "alternative_emissions": 0,
            "savings": 0,
            "percentage_reduction": 0,
            "alternatives": []
        }
    
    original_emissions = sum(item.emission_value for item in data_items)
    
    alternatives = []
    alternative_total = 0
    
    # Define eco-friendly alternatives
    alternative_map = {
        "car": ("bus", 0.05 / 0.21),  # (alternative, factor reduction)
        "flight": ("train", 0.03 / 0.25),
        "motorcycle": ("bus", 0.05 / 0.15),
        "electricity": ("solar_energy", 0.1),
        "plastic": ("reusable", 0.2),
    }
    
    for item in data_items:
        activity_lower = item.activity.lower()
        
        if activity_lower in alternative_map:
            alt_name, reduction_factor = alternative_map[activity_lower]
            alt_emission = item.emission_value * reduction_factor
        else:
            alt_name = f"{item.activity} (optimized)"
            alt_emission = item.emission_value * 0.7  # 30% reduction as default
        
        alternative_total += alt_emission
        
        alternatives.append({
            "original_activity": item.activity,
            "alternative_activity": alt_name,
            "original_emission": item.emission_value,
            "alternative_emission": alt_emission,
            "savings": item.emission_value - alt_emission
        })
    
    savings = original_emissions - alternative_total
    percentage_reduction = (savings / original_emissions * 100) if original_emissions > 0 else 0
    
    return {
        "original_emissions": original_emissions,
        "alternative_emissions": alternative_total,
        "savings": savings,
        "percentage_reduction": percentage_reduction,
        "alternatives": alternatives
    }

def calculate_sustainability_score(db: Session, user_id: int) -> float:
    """Calculate overall sustainability score (0-100)"""
    category_emissions = calculate_category_emissions(db, user_id, 30)
    
    # Normalize emissions (lower is better)
    # These thresholds are based on average monthly emissions
    thresholds = {
        "travel": 100,  # kg CO2
        "energy": 80,
        "water": 10,
        "waste": 30
    }
    
    total_impact = 0
    for category, emission in category_emissions.items():
        threshold = thresholds.get(category, 50)
        # Calculate impact (0-25 per category, max 100 total)
        impact = min((emission / threshold) * 25, 25)
        total_impact += impact
    
    # Score is inverse of impact (100 - impact)
    score = max(0, 100 - total_impact)
    return round(score, 1)

def get_dashboard_data(db: Session, user_id: int):
    """Get comprehensive dashboard data"""
    score = calculate_sustainability_score(db, user_id)
    category_breakdown = calculate_category_emissions(db, user_id)
    total_emissions = sum(category_breakdown.values())
    recent_activities = get_user_consumption_data(db, user_id, 7)
    goals = db.query(Goal).filter(Goal.user_id == user_id).all()
    
    return {
        "sustainability_score": score,
        "total_emissions": round(total_emissions, 2),
        "category_breakdown": {k: round(v, 2) for k, v in category_breakdown.items()},
        "recent_activities": recent_activities[:10],
        "goals_progress": goals
    }
