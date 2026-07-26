from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from app.core.config import settings


# ==========================================================
# Database Engine
# ==========================================================
engine = create_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,
    future=True
)


# ==========================================================
# Session Factory
# ==========================================================
SessionLocal = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False,
    future=True
)


# ==========================================================
# Base Class
# ==========================================================
Base = declarative_base()


# ==========================================================
# Database Dependency
# ==========================================================
def get_db():
    """
    Creates a new database session for each request and
    automatically closes it after the request is completed.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()