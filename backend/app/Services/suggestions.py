def generate_suggestions(resume_text, jd_data, score_data):
    suggestions = []

    if score_data["keyword_match"] < 60:
        suggestions.append(
            "Add more job-specific keywords from the job description"
        )

    if score_data["section_scores"].get("experience", 0) < 60:
        suggestions.append(
            "Improve experience section with measurable achievements"
        )

    if not jd_data.get("responsibilities"):
        suggestions.append(
            "Align your resume bullets with job responsibilities"
        )

    return suggestions
