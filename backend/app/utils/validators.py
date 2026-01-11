import re
from datetime import datetime
from datetime import datetime
from pydantic import BaseModel, Field, validator
from typing import List

CURRENT_YEAR = datetime.now().year

CURRENT_YEAR = datetime.now().year

def validate_pincode(pincode: str) -> str:
    """
    Validates Indian pincode (6 digits)
    """
    if not re.fullmatch(r"\d{6}", pincode):
        raise ValueError("Pincode must be exactly 6 digits")
    return pincode

def validate_phone(phone: str) -> str:
    """
    Validate Indian mobile number:
    - 10 digits
    - Starts with 6–9
    """
    pattern = r"^[6-9]\d{9}$"
    if not re.fullmatch(pattern, phone):
        raise ValueError("Phone number must be a valid 10-digit Indian mobile number")
    return phone

def validate_url(url: str) -> str:
    """
    Validates that URL starts with http:// or https://
    """
    if not url.startswith(("http://", "https://")):
        raise ValueError("URL must start with http:// or https://")
    return url

def validate_full_name(name: str) -> str:
    """
    Validates person's full name
    - At least 2 characters
    - Only letters and spaces
    """
    if not re.fullmatch(r"[A-Za-z ]{2,}", name.strip()):
        raise ValueError("Full name must contain only letters and spaces")
    return name.strip()

def validate_year(year: str) -> str:
    if not year.isdigit():
        raise ValueError("Year must be numeric")
    year_int = int(year)
    if year_int < 1980 or year_int > CURRENT_YEAR:
        raise ValueError("Year is out of valid range")
    return year


def validate_grade(grade_type: str, grade_value: str | None):
    if grade_value is None:
        return grade_value

    if grade_type.upper() == "CGPA":
        value = float(grade_value)
        if value < 0 or value > 10:
            raise ValueError("CGPA must be between 0 and 10")

    elif grade_type.upper() == "PERCENTAGE":
        value = float(grade_value)
        if value < 0 or value > 100:
            raise ValueError("Percentage must be between 0 and 100")

    else:
        raise ValueError("gradeType must be CGPA or Percentage")

    return grade_value

def validate_date(date_str: str) -> str:
    """
    Validates date in YYYY-MM format
    """
    try:
        datetime.strptime(date_str, "%Y-%m")
    except ValueError:
        raise ValueError("Date must be in YYYY-MM format")
    return date_str


def validate_experience_type(exp_type: str) -> str:
    allowed = {"FULL_TIME", "PART_TIME", "INTERNSHIP", "CONTRACT"}
    if exp_type.upper() not in allowed:
        raise ValueError(
            "Experience type must be FULL_TIME, PART_TIME, INTERNSHIP, or CONTRACT"
        )
    return exp_type


def validate_responsibilities(text: str) -> str:
    if len(text.strip()) < 20:
        raise ValueError("Responsibilities must be at least 20 characters")
    if len(text) > 1500:
        raise ValueError("Responsibilities cannot exceed 1500 characters")
    return text

def validate_project_date(date_str: str) -> str:
    """
    Validates project date in YYYY-MM format
    """
    try:
        datetime.strptime(date_str, "%Y-%m")
    except ValueError:
        raise ValueError("Project date must be in YYYY-MM format")
    return date_str


def validate_description(text: str) -> str:
    if len(text.strip()) < 30:
        raise ValueError("Project description must be at least 30 characters")
    if len(text) > 2000:
        raise ValueError("Project description cannot exceed 2000 characters")
    return text

def validate_skill_name(name: str) -> str:
    if not name or len(name.strip()) < 2:
        raise ValueError("Skill name must be at least 2 characters")
    if len(name) > 50:
        raise ValueError("Skill name cannot exceed 50 characters")
    return name.strip()


def validate_skill_level(level: str) -> str:
    allowed_levels = {"BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"}
    if level.upper() not in allowed_levels:
        raise ValueError(
            "Skill level must be one of: BEGINNER, INTERMEDIATE, ADVANCED, EXPERT"
        )
    return level.upper()

def validate_skill_category_title(title: str) -> str:
    if not title or len(title.strip()) < 2:
        raise ValueError("Skill category title must be at least 2 characters")
    if len(title) > 50:
        raise ValueError("Skill category title cannot exceed 50 characters")
    return title.strip()

def validate_cert_name(name: str) -> str:
    if not name or len(name.strip()) < 3:
        raise ValueError("Certification name must be at least 3 characters")
    return name.strip()


def validate_organization(org: str) -> str:
    if not org or len(org.strip()) < 2:
        raise ValueError("Organization name must be at least 2 characters")
    return org.strip()


def validate_cert_year(year: str) -> str:
    if not year.isdigit():
        raise ValueError("Certification year must be numeric")
    year_int = int(year)
    if year_int < 1980 or year_int > CURRENT_YEAR:
        raise ValueError("Certification year is out of valid range")
    return year

    @validator("education")
    def check_education_not_empty(cls, value):
        if len(value) == 0:
            raise ValueError("At least one education entry is required")
        return value                 