#!/bin/bash

echo "🌍 Personal Sustainability Time-Machine - Backend Setup"
echo "========================================================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.9 or higher."
    exit 1
fi

echo "✅ Python 3 found: $(python3 --version)"
echo ""

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL not found in PATH"
    echo "Please install PostgreSQL and ensure it's running:"
    echo ""
    echo "  Mac:    brew install postgresql && brew services start postgresql"
    echo "  Ubuntu: sudo apt-get install postgresql && sudo service postgresql start"
    echo ""
    read -p "Press Enter once PostgreSQL is installed and running..."
fi

echo ""
echo "📦 Installing Python dependencies..."
pip3 install -r requirements.txt

echo ""
echo "⚙️  Setting up environment variables..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created .env file from .env.example"
    echo ""
    echo "⚠️  IMPORTANT: Please update the following in backend/.env:"
    echo "   - DATABASE_URL (set your PostgreSQL credentials)"
    echo "   - SECRET_KEY (generate a secure random key)"
    echo ""
    echo "Generate a secure SECRET_KEY:"
    echo "   python3 -c \"import secrets; print(secrets.token_urlsafe(32))\""
    echo ""
else
    echo "✅ .env file already exists"
fi

echo ""
echo "🗄️  Creating database..."
read -p "Enter PostgreSQL username (default: postgres): " db_user
db_user=${db_user:-postgres}

read -p "Enter database name (default: sustainability_db): " db_name
db_name=${db_name:-sustainability_db}

echo ""
echo "Creating database '$db_name'..."
psql -U "$db_user" -c "CREATE DATABASE $db_name;" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ Database created successfully"
else
    echo "⚠️  Database might already exist or there was an error"
fi

echo ""
echo "✅ Backend setup complete!"
echo ""
echo "Next steps:"
echo "1. Update backend/.env with your database credentials"
echo "2. Run: python3 main.py"
echo "3. Visit: http://localhost:8000/docs"
echo ""
