"""
Database Initialization Script
Drops all tables and recreates them with fresh schema
WARNING: This will delete all existing data!
"""

from database import engine
from models import Base
import sys

def init_database():
    """Initialize database with fresh schema"""
    print("🗄️  Database Initialization")
    print("=" * 50)
    print()
    
    # Warning
    print("⚠️  WARNING: This will DELETE all existing data!")
    response = input("Are you sure you want to continue? (yes/no): ")
    
    if response.lower() != 'yes':
        print("❌ Initialization cancelled.")
        sys.exit(0)
    
    print()
    print("Dropping all tables...")
    Base.metadata.drop_all(bind=engine)
    print("✅ All tables dropped")
    
    print()
    print("Creating all tables...")
    Base.metadata.create_all(bind=engine)
    print("✅ All tables created")
    
    print()
    print("=" * 50)
    print("✅ Database initialization complete!")
    print()
    print("Tables created:")
    print("  - users")
    print("  - consumption_data")
    print("  - recommendations")
    print("  - habit_data")
    print("  - payback_plans")
    print("  - energy_simulations")
    print("  - goals")
    print()
    print("You can now start the server: python main.py")

if __name__ == "__main__":
    init_database()
