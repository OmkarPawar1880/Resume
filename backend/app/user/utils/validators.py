import re
from pathlib import Path


# ==========================================================
# Email Validation
# ==========================================================
def validate_email(email: str) -> bool:
    """
    Validate email address.
    """
    pattern = r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
    return bool(re.fullmatch(pattern, email))


# ==========================================================
# Phone Number Validation
# ==========================================================
def validate_phone(phone: str) -> bool:
    """
    Validate a 10-digit phone number.
    """
    return bool(re.fullmatch(r"^[6-9]\d{9}$", phone))


# ==========================================================
# Password Validation
# ==========================================================
def validate_password(password: str) -> bool:
    """
    Password must contain:
    - Minimum 8 characters
    - One uppercase letter
    - One lowercase letter
    - One digit
    - One special character
    """
    pattern = (
        r"^(?=.*[a-z])"
        r"(?=.*[A-Z])"
        r"(?=.*\d)"
        r"(?=.*[@$!%*?&])"
        r"[A-Za-z\d@$!%*?&]{8,}$"
    )

    return bool(re.fullmatch(pattern, password))


# ==========================================================
# Name Validation
# ==========================================================
def validate_name(name: str) -> bool:
    """
    Validate first name / last name.
    """
    return bool(re.fullmatch(r"^[A-Za-z ]{2,50}$", name))


# ==========================================================
# Resume Title Validation
# ==========================================================
def validate_resume_title(title: str) -> bool:
    """
    Resume title must be between 3 and 100 characters.
    """
    return 3 <= len(title.strip()) <= 100


# ==========================================================
# File Extension Validation
# ==========================================================
def validate_file_extension(
    filename: str,
    allowed_extensions: list[str]
) -> bool:

    extension = Path(filename).suffix.lower()

    return extension in allowed_extensions


# ==========================================================
# File Size Validation
# ==========================================================
def validate_file_size(
    file_size: int,
    max_size_mb: int = 5
) -> bool:
    """
    Validate uploaded file size.

    file_size is in bytes.
    """
    max_bytes = max_size_mb * 1024 * 1024

    return file_size <= max_bytes