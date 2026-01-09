from fastapi import APIRouter
from app.schemas.resume_schema import Resume
from app.schemas.resume_schema import PartialResume
import json
router = APIRouter(prefix="/resume", tags=["Resume"])

RESUME_STORE = {}

@router.post("/")
def submit_resume(resume: Resume):
    return {
        "status": "validated",
        "message": "Resume data accepted",
    }


@router.post("/partial")
def save_partial_resume(resume: PartialResume):
    data = resume.model_dump(exclude_none=True)

    # merge section-wise
    for section, value in data.items():
        RESUME_STORE[section] = value

    print("UPDATED RESUME STATE:")
    print(json.dumps(RESUME_STORE, indent=2))

    return {
        "status": "partial saved",
        "updated_sections": list(data.keys())
    }
