# app/routes/vehicle_type_routes.py

from fastapi import APIRouter
from api.public.skus.models import *
from api.public.skus.crud import crud_sku_type
from api.utils.api_router import get_crud_router


router = get_crud_router(
    model=Sku,
    create_schema=SkuCreate,
    update_schema=SkuUpdate,
    read_schema=SkuRead,
    crud=crud_sku_type,
)
