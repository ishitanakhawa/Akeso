from fastapi import APIRouter

router = APIRouter()

@router.get("/plans")
async def get_plans():
    return [
        {"name": "Weekly Plan", "price": 150},
        {"name": "Monthly Plan", "price": 550},
        {"name": "Yearly Plan", "price": 6500}
    ]
