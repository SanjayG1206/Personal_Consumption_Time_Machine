from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import Base
from database import engine
from routes import router
import os
from dotenv import load_dotenv

load_dotenv()

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Personal Sustainability Time-Machine API",
    description="Backend API for tracking and analyzing personal sustainability metrics",
    version="1.0.0"
)

# CORS configuration
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url, "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(router)

@app.get("/")
def root():
    return {
        "message": "Personal Sustainability Time-Machine API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
