from pydantic import BaseModel, EmailStr
from typing import Optional, List

class UserBase(BaseModel):
    email: EmailStr
    name: str

class UserCreate(UserBase):
    password: str

class UserProfileUpdate(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    life_role: Optional[str] = None

class UserResponse(UserBase):
    id: int
    age: Optional[int] = None
    gender: Optional[str] = None
    life_role: Optional[str] = None

    class Config:
        from_attributes = True

class QuestionResponse(BaseModel):
    sleep_hours: float
    stress_level: int
    energy_level: int
    activity_level: int
    focus_level: int
    mood_level: int
    anxiety_level: int
    life_role: str
    goal: str

class AnalysisResult(BaseModel):
    mental_score: int
    risk_level: str
    recommendations: List[str]
