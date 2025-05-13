from fastapi import APIRouter, Depends
from api.public.customers import api as customers
from api.public.vehicles import api as vehicles
from api.public.vehicle_types import api as vehicle_types
from api.public.skus import api as sku
from api.public.parts import api as parts
from api.public.part_market_data import api as part_market_data
#from api.auth import authent

api = APIRouter()

api.include_router(
    customers.router,
    prefix="/customers",
    tags=["Customers"],
    #dependencies=[Depends(authent)],
)

api.include_router(
    vehicles.router,
    prefix="/vehicles",
    tags=["Vehicles"],
    #dependencies=[Depends(authent)],
)

api.include_router(
    vehicle_types.router,
    prefix="/vehicle_types",
    tags=["Vehicle Types"],
    #dependencies=[Depends(authent)],
)

api.include_router(
    sku.router,
    prefix="/skus",
    tags=["skus"],
    #dependencies=[Depends(authent)],
)

api.include_router(
    parts.router,
    prefix="/parts",
    tags=["parts"],
    #dependencies=[Depends(authent)],
)

api.include_router(
    part_market_data.router,
    prefix="/part_market_data",
    tags=["part_market_data"],
    #dependencies=[Depends(authent)],
)





