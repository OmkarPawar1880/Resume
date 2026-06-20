SECTIONS = {
    "skills": ["skills", "technical skills"],
    "experience": ["experience", "work history"],
    "education": ["education", "academic"]
}

def detect_sections(text):
    section_scores = {}

    for section, keywords in SECTIONS.items():
        found = any(keyword in text for keyword in keywords)
        section_scores[section] = 100 if found else 40

    return section_scores
