# app/routes/vehicle_type_routes.py

from fastapi import APIRouter
from api.public.inventory.models import *
from api.public.inventory.crud import *
from api.utils.api_router import get_crud_router


router = get_crud_router(
    model=Inventory,
    create_schema=InventoryCreate,
    update_schema=InventoryUpdate,
    read_schema=InventoryRead,
    crud=crud_inventory,
)
