"""
Sample Data Seeder
Creates a test user with sample sustainability data for testing
"""

from database import SessionLocal
from models import User, ConsumptionData, Goal
from auth import get_password_hash
from datetime import datetime, timedelta
import random

def seed_sample_data():
    """Seed database with sample data"""
    db = SessionLocal()
    
    try:
        print("🌱 Seeding Sample Data")
        print("=" * 50)
        print()
        
        # Check if test user already exists
        existing_user = db.query(User).filter(User.email == "demo@sustainability.com").first()
        if existing_user:
            print("⚠️  Demo user already exists!")
            response = input("Delete and recreate? (yes/no): ")
            if response.lower() == 'yes':
                db.delete(existing_user)
                db.commit()
            else:
                print("❌ Seeding cancelled.")
                return
        
        # Create demo user
        print("Creating demo user...")
        demo_user = User(
            name="Demo User",
            email="demo@sustainability.com",
            password=get_password_hash("demo123"),
            created_at=datetime.utcnow()
        )
        db.add(demo_user)
        db.commit()
        db.refresh(demo_user)
        print(f"✅ Created user: {demo_user.email}")
        
        # Sample activities
        activities = [
            # Travel
            ("travel", "car", 25, "km", 0.21),
            ("travel", "bus", 15, "km", 0.05),
            ("travel", "train", 40, "km", 0.03),
            ("travel", "car", 30, "km", 0.21),
            ("travel", "bus", 20, "km", 0.05),
            
            # Energy
            ("energy", "electricity", 12, "kWh", 0.82),
            ("energy", "electricity", 15, "kWh", 0.82),
            ("energy", "natural_gas", 8, "kWh", 0.18),
            ("energy", "electricity", 10, "kWh", 0.82),
            
            # Water
            ("water", "water", 150, "liters", 0.001),
            ("water", "water", 180, "liters", 0.001),
            ("water", "water", 160, "liters", 0.001),
            
            # Waste
            ("waste", "plastic", 0.5, "kg", 6.0),
            ("waste", "paper", 1.2, "kg", 1.5),
            ("waste", "plastic", 0.8, "kg", 6.0),
            ("waste", "glass", 0.6, "kg", 0.5),
        ]
        
        print()
        print("Adding consumption data...")
        
        # Add data over the last 7 days
        for i, (category, activity, quantity, unit, emission_factor) in enumerate(activities):
            days_ago = i % 7
            date = datetime.utcnow() - timedelta(days=days_ago)
            emission_value = quantity * emission_factor
            
            data = ConsumptionData(
                user_id=demo_user.id,
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
        print(f"✅ Added {len(activities)} consumption entries")
        
        # Create sample goals
        print()
        print("Creating sample goals...")
        
        goals_data = [
            ("Reduce carbon emissions by 20%", 100, 45, "kg CO2", 30),
            ("Use public transport 3x/week", 12, 7, "trips", 30),
            ("Reduce water usage by 15%", 150, 120, "liters", 60),
        ]
        
        for title, target, current, unit, days in goals_data:
            deadline = datetime.utcnow() + timedelta(days=days)
            goal = Goal(
                user_id=demo_user.id,
                title=title,
                target=target,
                current=current,
                unit=unit,
                deadline=deadline
            )
            db.add(goal)
        
        db.commit()
        print(f"✅ Created {len(goals_data)} goals")
        
        print()
        print("=" * 50)
        print("✅ Sample data seeded successfully!")
        print()
        print("Demo Account Credentials:")
        print("  Email: demo@sustainability.com")
        print("  Password: demo123")
        print()
        print("You can now login with these credentials!")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_sample_data()
