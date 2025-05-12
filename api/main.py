import uvicorn

from api.app import create_app
from api.config import settings

app = create_app(settings)
