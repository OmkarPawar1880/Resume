from app.utils.text_cleaner import clean_text

def parse_jd(jd_text: str):
    jd_text = clean_text(jd_text)

    responsibilities = []
    keywords = []

    for line in jd_text.split("\n"):
        if any(word in line for word in ["responsible", "responsibilities", "you will"]):
            responsibilities.append(line)
        else:
            keywords.extend(line.split())

    return {
        "full_text": jd_text,
        "responsibilities": responsibilities,
        "keywords": list(set(keywords))
    }
