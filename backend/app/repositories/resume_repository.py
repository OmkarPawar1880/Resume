from sqlalchemy.orm import Session
from app.db.models.resume_version import ResumeVersion

def get_resume_version_by_id(db: Session, resume_version_id):
    return (
        db.query(ResumeVersion)
        .filter(ResumeVersion.id == resume_version_id)
        .first()
    )
