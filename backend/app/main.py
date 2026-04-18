from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, users, questions, analysis, doctors, reports, plans
from .database import engine
from .models import user as user_models

# Create Database Tables
user_models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Akeso AI Backend", version="1.0.0")

# CORS middleware to allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router, prefix="/api", tags=["Authentication"])
app.include_router(users.router, prefix="/api", tags=["Users"])
app.include_router(questions.router, prefix="/api", tags=["Questions"])
app.include_router(analysis.router, prefix="/api", tags=["AI Analysis"])
app.include_router(doctors.router, prefix="/api", tags=["Doctors"])
app.include_router(reports.router, prefix="/api", tags=["Reports"])
app.include_router(plans.router, prefix="/api", tags=["Plans"])

@app.get("/")
async def root():
    return {"message": "Welcome to Akeso API - Mental Health AI Copilot"}
