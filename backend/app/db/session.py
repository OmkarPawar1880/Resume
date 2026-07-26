from typing import Generator

from sqlalchemy.orm import Session

from app.db.database import SessionLocal


def get_db() -> Generator[Session, None, None]:
    """
    Database Dependency

    Creates a new database session for each request and
    automatically closes it after the request is completed.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()