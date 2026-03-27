#!/bin/bash

echo "🌍 Personal Sustainability Time-Machine - Complete Setup"
echo "========================================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}This script will set up both frontend and backend${NC}"
echo ""

# Check Node.js
echo "Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi
echo "✅ Node.js found: $(node --version)"
echo ""

# Check Python
echo "Checking Python..."
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.9 or higher."
    exit 1
fi
echo "✅ Python 3 found: $(python3 --version)"
echo ""

# Frontend setup
echo -e "${GREEN}📦 Setting up Frontend...${NC}"
echo ""

if [ ! -f .env ]; then
    echo "Creating frontend .env file..."
    cp .env.example .env
    echo "✅ Frontend .env created"
else
    echo "✅ Frontend .env already exists"
fi

echo ""
echo "Installing frontend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

echo ""
echo -e "${GREEN}🐍 Setting up Backend...${NC}"
echo ""

cd backend

if [ ! -f .env ]; then
    echo "Creating backend .env file..."
    cp .env.example .env
    echo "✅ Backend .env created"
    echo ""
    echo -e "${YELLOW}⚠️  IMPORTANT: Update backend/.env with:${NC}"
    echo "   - DATABASE_URL (your PostgreSQL credentials)"
    echo "   - SECRET_KEY (run: python3 -c \"import secrets; print(secrets.token_urlsafe(32))\")"
    echo ""
else
    echo "✅ Backend .env already exists"
fi

echo ""
echo "Installing backend dependencies..."
pip3 install -r requirements.txt

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Backend dependencies installed${NC}"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

cd ..

echo ""
echo "========================================================="
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo "========================================================="
echo ""
echo "Next steps:"
echo ""
echo "1️⃣  Set up PostgreSQL database:"
echo "   - Install: brew install postgresql (Mac) or apt-get install postgresql (Linux)"
echo "   - Create DB: createdb sustainability_db"
echo ""
echo "2️⃣  Update backend/.env with your database credentials"
echo ""
echo "3️⃣  Start the backend:"
echo "   cd backend"
echo "   python3 main.py"
echo ""
echo "4️⃣  In a new terminal, start the frontend:"
echo "   npm run dev"
echo ""
echo "5️⃣  Open your browser:"
echo "   Frontend: http://localhost:5173"
echo "   Backend API Docs: http://localhost:8000/docs"
echo ""
echo "📖 For detailed instructions, see INTEGRATION_README.md"
echo ""
