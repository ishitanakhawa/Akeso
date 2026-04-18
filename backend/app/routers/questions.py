from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import user as models
from ..schemas import user_schema as schemas

router = APIRouter()

@router.post("/questions/{user_id}")
async def post_questions(user_id: int, response: schemas.QuestionResponse, db: Session = Depends(get_db)):
    new_response = models.Response(
        user_id=user_id,
        **response.dict()
    )
    db.add(new_response)
    db.commit()
    db.refresh(new_response)
    return {"message": "Daily check-in data stored successfully", "response_id": new_response.id}
