# app/routes/vehicle_type_routes.py

from fastapi import APIRouter
from api.public.vehicle_types.models import *
from api.public.vehicle_types.crud import crud_vehicle_types
from api.utils.api_router import get_crud_router


router = get_crud_router(
    model=VehicleType,
    create_schema=VehicleTypeCreate,
    update_schema=VehicleTypeUpdate,
    read_schema=VehicleTypeRead,
    crud=crud_vehicle_types,
)
