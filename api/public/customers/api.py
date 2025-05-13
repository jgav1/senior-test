# app/routes/vehicle_type_routes.py

from fastapi import APIRouter
from api.public.customers.models import *
from api.public.customers.crud import crud_customer_type
from api.utils.api_router import get_crud_router


router = get_crud_router(
    model=Customer,
    create_schema=CustomerCreate,
    update_schema=CustomerUpdate,
    read_schema=CustomerRead,
    crud=crud_customer_type,
)
