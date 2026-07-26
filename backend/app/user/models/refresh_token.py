from datetime import datetime
import uuid

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.db.database import Base


class RefreshToken(Base):
    """
    Stores hashed refresh tokens for authenticated users.
    """

    __tablename__ = "refresh_tokens"

    # ==================================================
    # Primary Key
    # ==================================================
    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        index=True
    )

    # ==================================================
    # User Relationship
    # ==================================================
    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )

    # Store HASHED refresh token
    token = Column(
        String(500),
        nullable=False,
        unique=True
    )

    expires_at = Column(
        DateTime,
        nullable=False
    )

    is_revoked = Column(
        Boolean,
        default=False,
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    # Relationship
    user = relationship("User", backref="refresh_tokens")

    def __repr__(self):
        return f"<RefreshToken {self.user_id}>"