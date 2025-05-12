import os
import secrets
from typing import Literal

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = f"AutoPartsPro fastapi - {os.getenv('ENV', 'development').capitalize()}"
    DESCRIPTION: str = "AutopartsPro Backend running on FastAPI + SQLModel production-ready API"
    ENV: Literal["development", "staging", "production"] = "development"
    VERSION: str = "0.1"
    DATABASE_URI: str = "postgresql://postgres:postgres@db:5432/autopartspro"

    class Config:
        case_sensitive = True


settings = Settings()


class TestSettings(Settings):
    class Config:
        case_sensitive = True


test_settings = TestSettings()
