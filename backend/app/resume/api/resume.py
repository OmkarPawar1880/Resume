from fastapi import APIRouter, HTTPException
from app.resume.schemas.resume_schema import Resume, PartialResume
from app.resume.services.latex_generator import generate_latex
from app.resume.services.pdf_compiler import compile_pdf
import time
import json
from fastapi import Request
from pydantic import ValidationError

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
async def save_partial_resume(request: Request):
    try:
        body = await request.json()

        print("\n===== EXPERIENCE REQUEST =====")
        print(json.dumps(body, indent=2))

        resume = PartialResume(**body)

        data = resume.model_dump(exclude_none=True)

        for section, value in data.items():
            RESUME_STORE[section] = value

        return {
            "status": "partial saved",
            "updated_sections": list(data.keys())
        }

    except ValidationError as e:
        print("\n===== VALIDATION ERROR =====")
        print(e.errors())

       

# ---------------------------
# Generate Resume PDF
# ---------------------------
@router.post("/generate")
def generate_resume(resume: Resume):
    try:
        resume_dict = resume.model_dump()

        # --- PERSONAL ---
        # ---------- PERSONAL ----------
        resume_dict["personal"]["name"] = resume_dict["personal"]["fullName"]

        # location
        loc = resume_dict["personal"]["location"]
        resume_dict["personal"]["location"] = f'{loc["city"]}, {loc["state"]}'

        # contact
        resume_dict["personal"]["phone"] = resume_dict["personal"]["contact"]["phone"]
        resume_dict["personal"]["email"] = resume_dict["personal"]["contact"]["email"]

        # links  ✅ THIS FIXES ICONS
        resume_dict["personal"]["linkedin"] = resume_dict["personal"]["links"].get("linkedin")
        resume_dict["personal"]["github"] = resume_dict["personal"]["links"].get("github")
        resume_dict["personal"]["portfolio"] = resume_dict["personal"]["links"].get("portfolio")


        # --- EDUCATION ---
        for edu in resume_dict["education"]:
            edu["degree"] = f'{edu["degree"]} - {edu.get("specialization","")}'
            edu["grade"] = f'{edu["gradeType"]} - {edu["gradeValue"]}'
            edu["years"] = f'{edu["startYear"]} - {edu["endYear"]}'
            edu["location"] = f'{edu["city"]}, {edu["state"]}'

        # --- EXPERIENCE ---
        for exp in resume_dict["experience"]:
            exp["mode"] = "Remote" if "Remote" in exp["location"] else "Onsite"
            exp["duration"] = f'{exp["startDate"]} - {exp["endDate"]}'
            exp["points"] = exp["responsibilities"].split(". ")

        # --- PROJECTS ---
        for proj in resume_dict["projects"]:
            proj["tech"] = ", ".join(proj["technologies"])
            proj["date"] = proj["projectDate"]
            proj["points"] = [proj["description"]]

        

        latex_code = generate_latex(resume_dict)
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
