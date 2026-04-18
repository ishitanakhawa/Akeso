from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import user as models
from ..schemas import user_schema as schemas
from ..services.ai_service import AIService
import json

router = APIRouter()

from pydantic import BaseModel

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
async def chat(request: ChatRequest):
    msg = request.message.lower()
    reply = "I'm here to support you. Focusing on your breathing or a short walk can often help rebalance your energy."
    
    if "stress" in msg:
        reply = "It sounds like you're feeling the weight of things lately. Try a quick 5-minute break with a focus on deep belly breathing. It can help lower your cortisol levels instantly."
    elif "anxiety" in msg or "anxious" in msg:
        reply = "Anxiety can feel overwhelming. Remember to ground yourself in the present moment. Try the 5-4-3-2-1 technique: name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, and 1 you can taste."
    elif "sleep" in msg:
        reply = "Rest is the foundation of mental health. Try to dim your lights 30 minutes before bed and avoid screens to help your brain produce melatonin naturally."
    elif "energy" in msg or "tired" in msg:
        reply = "Low energy often follows high-stress peaks. A short 10-minute walk or hydrating well can give you a natural boost without a caffeine crash later."
    elif "productivity" in msg or "focus" in msg:
        reply = "For better focus, try the Pomodoro technique: 25 minutes of deep work followed by a 5-minute break. This rhythm keeps your brain from burning out."

    return {"reply": reply}

@router.post("/analyze/{user_id}", response_model=schemas.AnalysisResult)
async def analyze(user_id: int, db: Session = Depends(get_db)):
    # Fetch latest response for the user
    last_response = db.query(models.Response).filter(models.Response.user_id == user_id).order_by(models.Response.id.desc()).first()
    if not last_response:
        raise HTTPException(status_code=404, detail="No response data found for analysis")
    
    # Run AI Analysis
    data = {
        "sleep_hours": last_response.sleep_hours,
        "stress_level": last_response.stress_level,
        "anxiety_level": last_response.anxiety_level,
        "energy_level": last_response.energy_level
    }
    analysis_data = AIService.analyze_patterns(data)
    
    # Store or Update Analysis
    db_analysis = db.query(models.Analysis).filter(models.Analysis.user_id == user_id).first()
    if not db_analysis:
        db_analysis = models.Analysis(user_id=user_id)
        db.add(db_analysis)
    
    db_analysis.mental_score = analysis_data["mental_score"]
    db_analysis.risk_level = analysis_data["risk_level"]
    db_analysis.recommendations = json.dumps(analysis_data["recommendations"])
    
    db.commit()
    return analysis_data
