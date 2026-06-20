from app.services.keyword_matcher import keyword_match
from app.services.section_detector import detect_sections

def calculate_ats_score(resume_text, jd_data):
    keyword_score, missing_keywords = keyword_match(
        resume_text,
        jd_data["keywords"]
    )

    section_scores = detect_sections(resume_text)

    ats_score = (
        keyword_score * 0.4 +
        sum(section_scores.values()) / len(section_scores) * 0.6
    )

    return {
        "ats_score": round(ats_score, 2),
        "keyword_match": round(keyword_score, 2),
        "missing_keywords": missing_keywords[:10],
        "section_scores": section_scores
    }
