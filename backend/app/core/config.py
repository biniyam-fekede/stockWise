"""
Configuration module for environment variables and application settings.
Validates all required environment variables on startup.
"""

from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """
    Application settings loaded from environment variables.
    Uses .env file for local development.
    """
    
    # Robinhood credentials
    ROBIN_USER: str
    ROBIN_PASS: str
    
    # Finnhub API
    FINNHUB_API_KEY: str
    
    # Application settings
    APP_NAME: str = "Finance Insight Dashboard"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True
    
    # API settings
    API_V1_PREFIX: str = "/api"
    
    # CORS settings
    ALLOWED_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
    ]
    
    class Config:
        env_file = ".env"
        case_sensitive = True


@lru_cache()
def get_settings() -> Settings:
    """
    Cached settings instance to avoid reloading environment variables.
    Returns:
        Settings: Application settings
    """
    return Settings()
