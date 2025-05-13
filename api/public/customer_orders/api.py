# app/routes/vehicle_type_routes.py

from fastapi import APIRouter
from api.public.customer_orders.models import *
from api.public.customer_orders.crud import crud_customer_order
from api.utils.api_router import get_crud_router


router = get_crud_router(
    model=CustomerOrder,
    create_schema=CustomerOrderCreate,
    update_schema=CustomerOrderUpdate,
    read_schema=CustomerOrderRead,
    crud=crud_customer_order,
)
