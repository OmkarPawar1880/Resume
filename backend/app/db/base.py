"""
Register all SQLAlchemy models with the shared Base.

Import every model here so SQLAlchemy metadata knows about them.
"""

from app.db.database import Base

# ==========================================================
# User Models
# ==========================================================
from app.user.models.user import User
from app.user.models.refresh_token import RefreshToken

# ==========================================================
# Resume Models
# ==========================================================
# Uncomment these when the models exist.
#
# from app.resume.models.resume import Resume
# from app.resume.models.resume_version import ResumeVersion

__all__ = [
    "Base",
    "User",
    "RefreshToken",
    # "Resume",
    # "ResumeVersion",
]