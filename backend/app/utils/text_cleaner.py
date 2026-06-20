import re
import string

def clean_text(text: str) -> str:
    """
    Clean and normalize text for ATS analysis.
    This function is used for BOTH resume text and job description text.
    """

    if not text:
        return ""

    # 1️⃣ Convert to string & lowercase
    text = str(text).lower()

    # 2️⃣ Replace common ATS-breaking characters
    # Example: bullets, special dashes, non-ASCII
    text = text.replace("•", " ")
    text = text.replace("–", "-")
    text = text.replace("—", "-")

    # 3️⃣ Remove URLs and emails (ATS ignores these for keyword matching)
    text = re.sub(r"http\S+|www\S+", " ", text)
    text = re.sub(r"\S+@\S+", " ", text)

    # 4️⃣ Remove numbers that are not useful for keyword matching
    # Keep years like 2023 if needed later (optional)
    text = re.sub(r"\d+", " ", text)

    # 5️⃣ Remove punctuation except hyphen (useful for keywords like full-stack)
    punctuation = string.punctuation.replace("-", "")
    text = text.translate(str.maketrans("", "", punctuation))

    # 6️⃣ Remove extra whitespace
    text = re.sub(r"\s+", " ", text).strip()

    return text
