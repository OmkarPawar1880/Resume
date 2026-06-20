def keyword_match(resume_text, jd_keywords):
    resume_words = set(resume_text.split())
    matched = resume_words.intersection(set(jd_keywords))

    match_percentage = (len(matched) / len(jd_keywords)) * 100 if jd_keywords else 0

    missing = list(set(jd_keywords) - matched)

    return match_percentage, missing
