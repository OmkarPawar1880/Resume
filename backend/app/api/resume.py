from fastapi import APIRouter, HTTPException
from app.schemas.resume_schema import Resume, PartialResume
from app.Services.latex_generator import generate_latex
from app.Services.pdf_compiler import compile_pdf
import time
import json

# 🚫 NO prefix here
router = APIRouter(tags=["Resume"])

RESUME_STORE = {}

# ---------------------------
# Submit full resume
# ---------------------------
@router.post("/")
def submit_resume(resume: Resume):
    return {
        "status": "validated",
        "message": "Resume data accepted",
    }

# ---------------------------
# Save partial resume
# ---------------------------
@router.post("/partial")
def save_partial_resume(resume: PartialResume):
    data = resume.model_dump(exclude_none=True)

    for section, value in data.items():
        RESUME_STORE[section] = value

    print("UPDATED RESUME STATE:")
    print(json.dumps(RESUME_STORE, indent=2))

    return {
        "status": "partial saved",
        "updated_sections": list(data.keys())
    }

# ---------------------------
# Generate Resume PDF
# ---------------------------
@router.post("/generate")
def generate_resume(resume: dict):
    try:
        latex_code = generate_latex(resume)
        filename = f"resume_{int(time.time())}"
        pdf_name = compile_pdf(latex_code, filename)

        return {
            "success": True,
            "downloadUrl": f"/uploads/resumes/{pdf_name}"
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Resume generation failed: {str(e)}"
        )
