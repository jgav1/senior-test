# app/routes/vehicle_type_routes.py

from fastapi import APIRouter
from api.public.profit_loss.models import *
from api.public.profit_loss.crud import crud_profit_loss
from api.utils.api_router import get_crud_router


router = get_crud_router(
    model=ProfitLoss,
    create_schema=ProfitLossCreate,
    update_schema=ProfitLossUpdate,
    read_schema=ProfitLossRead,
    crud=crud_profit_loss,
)
