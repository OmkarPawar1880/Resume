from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Application Settings
    Automatically loads values from .env
    """

    # ==========================
    # Application
    # ==========================
    APP_NAME: str
    APP_VERSION: str
    DEBUG: bool = False

    # ==========================
    # PostgreSQL Database
    # ==========================
    DATABASE_URL: str

    # ==========================
    # JWT Authentication
    # ==========================
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    REFRESH_TOKEN_EXPIRE_DAYS: int

    # ==========================
    # Email (Optional)
    # ==========================
    SMTP_HOST: str | None = None
    SMTP_PORT: int | None = None
    SMTP_USERNAME: str | None = None
    SMTP_PASSWORD: str | None = None
    EMAIL_FROM: str | None = None

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()