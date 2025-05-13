# app/routes/vehicle_type_routes.py

from fastapi import APIRouter
from api.public.part_market_data.models import *
from api.public.part_market_data.crud import crud_parts_market_data
from api.utils.api_router import get_crud_router


router = get_crud_router(
    model=PartsMarketData,
    create_schema=PartsMarketDataCreate,
    update_schema=PartsMarketDataUpdate,
    read_schema=PartsMarketDataRead,
    crud=crud_parts_market_data,
)
