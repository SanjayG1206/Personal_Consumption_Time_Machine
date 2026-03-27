"""
Health Check Script
Verifies backend setup and database connectivity
"""

import sys
import os

def check_dependencies():
    """Check if all required Python packages are installed"""
    print("📦 Checking Python dependencies...")
    
    required = [
        'fastapi',
        'uvicorn',
        'sqlalchemy',
        'psycopg2',
        'jose',
        'passlib',
        'pydantic',
        'python_dotenv'
    ]
    
    missing = []
    for package in required:
        try:
            __import__(package)
        except ImportError:
            missing.append(package)
    
    if missing:
        print(f"❌ Missing packages: {', '.join(missing)}")
        print("   Run: pip install -r requirements.txt")
        return False
    
    print("✅ All dependencies installed")
    return True

def check_env_file():
    """Check if .env file exists and has required variables"""
    print("\n⚙️  Checking environment configuration...")
    
    if not os.path.exists('.env'):
        print("❌ .env file not found")
        print("   Run: cp .env.example .env")
        return False
    
    from dotenv import load_dotenv
    load_dotenv()
    
    required_vars = ['DATABASE_URL', 'SECRET_KEY']
    missing = []
    
    for var in required_vars:
        if not os.getenv(var):
            missing.append(var)
    
    if missing:
        print(f"❌ Missing environment variables: {', '.join(missing)}")
        print("   Update your .env file")
        return False
    
    print("✅ Environment variables configured")
    return True

def check_database():
    """Check database connectivity"""
    print("\n🗄️  Checking database connection...")
    
    try:
        from database import engine
        from sqlalchemy import text
        
        with engine.connect() as conn:
            result = conn.execute(text("SELECT 1"))
            result.fetchone()
        
        print("✅ Database connection successful")
        return True
        
    except Exception as e:
        print(f"❌ Database connection failed: {str(e)}")
        print("   Check your DATABASE_URL in .env")
        print("   Ensure PostgreSQL is running")
        return False

def check_tables():
    """Check if database tables exist"""
    print("\n📋 Checking database tables...")
    
    try:
        from database import engine
        from sqlalchemy import inspect
        
        inspector = inspect(engine)
        tables = inspector.get_table_names()
        
        required_tables = [
            'users',
            'consumption_data',
            'recommendations',
            'habit_data',
            'payback_plans',
            'energy_simulations',
            'goals'
        ]
        
        missing = [t for t in required_tables if t not in tables]
        
        if missing:
            print(f"⚠️  Missing tables: {', '.join(missing)}")
            print("   Run: python init_db.py")
            return False
        
        print(f"✅ All {len(required_tables)} tables exist")
        return True
        
    except Exception as e:
        print(f"❌ Error checking tables: {str(e)}")
        return False

def main():
    """Run all health checks"""
    print("🏥 Backend Health Check")
    print("=" * 50)
    print()
    
    checks = [
        check_dependencies(),
        check_env_file(),
        check_database(),
        check_tables()
    ]
    
    print()
    print("=" * 50)
    
    if all(checks):
        print("✅ All health checks passed!")
        print("\nYou can now start the server:")
        print("   python main.py")
        print("\nOr add sample data:")
        print("   python seed_data.py")
        return 0
    else:
        print("❌ Some health checks failed")
        print("\nPlease fix the issues above and try again")
        return 1

if __name__ == "__main__":
    sys.exit(main())
