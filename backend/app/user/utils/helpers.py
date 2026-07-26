import re
import uuid
from datetime import datetime, timezone
from pathlib import Path


# ==========================================================
# UUID Helper
# ==========================================================
def generate_uuid() -> str:
    """
    Generate a UUID string.
    """
    return str(uuid.uuid4())


# ==========================================================
# Current UTC Time
# ==========================================================
def utc_now() -> datetime:
    """
    Return current UTC datetime.
    """
    return datetime.now(timezone.utc)


# ==========================================================
# Slug Generator
# ==========================================================
def generate_slug(text: str) -> str:
    """
    Convert text into a URL-friendly slug.

    Example:
    "My Resume 2026"
    ->
    "my-resume-2026"
    """
    text = text.lower().strip()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")


# ==========================================================
# Secure Filename
# ==========================================================
def generate_filename(
    filename: str,
    extension: str
) -> str:
    """
    Generate a unique filename.

    Example:
    resume.pdf
    ->
    5c1e4fd2-8f5c-4f88.pdf
    """
    return f"{uuid.uuid4()}.{extension}"


# ==========================================================
# Get File Extension
# ==========================================================
def get_extension(filename: str) -> str:
    """
    Returns file extension.

    Example:
    resume.pdf
    ->
    pdf
    """
    return Path(filename).suffix.replace(".", "")


# ==========================================================
# Datetime Formatter
# ==========================================================
def format_datetime(date: datetime) -> str:
    """
    Convert datetime to ISO format.
    """
    return date.strftime("%Y-%m-%d %H:%M:%S")