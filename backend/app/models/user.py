from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    age = Column(Integer, nullable=True)
    gender = Column(String, nullable=True)
    life_role = Column(String, nullable=True)

    responses = relationship("Response", back_populates="user")
    analysis = relationship("Analysis", back_populates="user", uselist=False)

class Response(Base):
    __tablename__ = "responses"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    sleep_hours = Column(Float)
    stress_level = Column(Integer)
    energy_level = Column(Integer)
    activity_level = Column(Integer)
    focus_level = Column(Integer)
    mood_level = Column(Integer)
    anxiety_level = Column(Integer)
    life_role = Column(String)
    goal = Column(String)

    user = relationship("User", back_populates="responses")

class Analysis(Base):
    __tablename__ = "analysis"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    mental_score = Column(Integer)
    risk_level = Column(String)
    recommendations = Column(String) # JSON string or comma-separated

    user = relationship("User", back_populates="analysis")

class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    specialization = Column(String)
    experience = Column(String)
