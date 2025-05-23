from contextlib import asynccontextmanager

from fastapi import FastAPI

from api.config import Settings
from api.database import create_db_and_tables
from api.public import api as public_api
from api.utils.logger import logger_config
from fastapi.middleware.cors import CORSMiddleware


logger = logger_config(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    #create_heroes_and_teams()

    logger.info("startup: triggered")

    yield

    logger.info("shutdown: triggered")


def create_app(settings: Settings):
    app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.VERSION,
        docs_url="/",
        description=settings.DESCRIPTION,
        lifespan=lifespan,
    )

    app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],  # or list like ["GET", "POST"]
    allow_headers=["*"],  # or ["Authorization", "Content-Type"]
)

    app.include_router(public_api)

    return app
