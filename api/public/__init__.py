from fastapi import APIRouter, Depends
from api.public.customers import api as customers
from api.public.vehicles import api as vehicles
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


