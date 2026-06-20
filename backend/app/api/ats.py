from fastapi import APIRouter, UploadFile, Form
from app.services.resume_parser import extract_resume_text
from app.services.jd_parser import parse_jd
from app.services.ats_scorer import calculate_ats_score
from app.services.suggestions import generate_suggestions

router = APIRouter()

@router.post("/analyze")
async def analyze_resume(
    resume: UploadFile,
    job_description: str = Form(...)
):
    resume_text = extract_resume_text(resume)
    jd_data = parse_jd(job_description)

    score_data = calculate_ats_score(resume_text, jd_data)
    suggestions = generate_suggestions(resume_text, jd_data, score_data)

    return {
        **score_data,
        "suggestions": suggestions
    }
