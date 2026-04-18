from fastapi import APIRouter

router = APIRouter()

@router.get("/doctors")
async def get_doctors():
    return [
        {"id": 1, "name": "Dr. Aarav Sharma", "specialization": "Psychiatrist • Stress Management", "experience": "12 years", "location": "New Delhi, India"},
        {"id": 2, "name": "Dr. Ishani Patel", "specialization": "Anxiety Specialist", "experience": "9 years", "location": "Mumbai, India"},
        {"id": 3, "name": "Dr. Rohan Iyer", "specialization": "Clinical Psychologist", "experience": "7 years", "location": "Bangalore, India"},
        {"id": 4, "name": "Dr. Ananya Reddy", "specialization": "Behavioral Therapist", "experience": "10 years", "location": "Hyderabad, India"}
    ]

@router.get("/doctor/{id}")
async def get_doctor_dashboard(id: int):
    return {
        "patients_monitored": 142,
        "burnout_alerts": 4,
        "improving_trends": 84,
        "patients": [
            {"name": "Jai S.", "status": "Moderate Stress"},
            {"name": "Sarah M.", "status": "Burnout Risk"},
            {"name": "Elena R.", "status": "Improving"}
        ]
    }
