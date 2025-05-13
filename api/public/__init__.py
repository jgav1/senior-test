from fastapi import APIRouter, Depends
from api.public.customers import api as customers
from api.public.vehicles import api as vehicles
from api.public.vehicle_types import api as vehicle_types
from api.public.skus import api as sku
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


