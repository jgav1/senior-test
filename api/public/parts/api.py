# app/routes/vehicle_type_routes.py

from fastapi import APIRouter
from api.public.parts.models import *
from api.public.parts.crud import crud_parts
from api.utils.api_router import get_crud_router


router = get_crud_router(
    model=Parts,
    create_schema=PartsCreate,
    update_schema=PartsUpdate,
    read_schema=PartsRead,
    crud=crud_parts,
)
