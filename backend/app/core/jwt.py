from datetime import datetime, timedelta, timezone
from typing import Any

from jose import JWTError, jwt

from app.core.config import settings


class JWTHandler:
    """
    JWT Token Utility
    """

    @staticmethod
    def create_access_token(data: dict[str, Any]) -> str:
        """
        Generate an Access Token.
        """
        payload = data.copy()

        expire = datetime.now(timezone.utc) + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )

        payload.update(
            {
                "exp": expire,
                "type": "access"
            }
        )

        return jwt.encode(
            payload,
            settings.SECRET_KEY,
            algorithm=settings.ALGORITHM
        )

    @staticmethod
    def create_refresh_token(data: dict[str, Any]) -> str:
        """
        Generate a Refresh Token.
        """
        payload = data.copy()

        expire = datetime.now(timezone.utc) + timedelta(
            days=settings.REFRESH_TOKEN_EXPIRE_DAYS
        )

        payload.update(
            {
                "exp": expire,
                "type": "refresh"
            }
        )

        return jwt.encode(
            payload,
            settings.SECRET_KEY,
            algorithm=settings.ALGORITHM
        )

    @staticmethod
    def decode_token(token: str) -> dict:
        """
        Decode and validate a JWT.
        Raises JWTError if invalid.
        """
        return jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )

    @staticmethod
    def verify_token(token: str, token_type: str = "access") -> dict:
        """
        Verify token type and validity.
        """
        payload = JWTHandler.decode_token(token)

        if payload.get("type") != token_type:
            raise JWTError("Invalid token type.")

        return payload


jwt_handler = JWTHandler()