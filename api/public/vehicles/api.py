# app/routes/vehicle_type_routes.py

from fastapi import APIRouter
from api.public.vehicles.models import *
from api.public.vehicles.crud import crud_vehicles
from api.utils.api_router import get_crud_router


router = get_crud_router(
    model=Vehicle,
    create_schema=VehicleCreate,
    update_schema=VehicleUpdate,
    read_schema=VehicleRead,
    crud=crud_vehicles,
)
