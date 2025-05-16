from fastapi import APIRouter, Depends
from api.public.customers import api as customers
from api.public.vehicles import api as vehicles
from api.public.vehicle_types import api as vehicle_types
from api.public.skus import api as sku
from api.public.parts import api as parts
from api.public.part_market_data import api as part_market_data
from api.public.customer_orders import api as customer_orders
from api.public.inventory import api as inventory
from api.public.workshop_orders import api as workshop_orders
from api.public.jobs import api as jobs
from api.public.profit_loss import api as profit_loss
from api.services import api as services


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
    tags=["SKUs"],
    #dependencies=[Depends(authent)],
)

api.include_router(
    parts.router,
    prefix="/parts",
    tags=["Parts"],
    #dependencies=[Depends(authent)],
)

api.include_router(
    part_market_data.router,
    prefix="/part_market_data",
    tags=["Part Market Data"],
    #dependencies=[Depends(authent)],
)

api.include_router(
    customer_orders.router,
    prefix="/customer_orders",
    tags=["Customer Orders"],
    #dependencies=[Depends(authent)],
)
"""
api.include_router(
    inventory.router,
    prefix="/inventory",
    tags=["Inventory"],
    #dependencies=[Depends(authent)],
)
"""

api.include_router(
    workshop_orders.router,
    prefix="/workshop_orders",
    tags=["Workshop Orders"],
    #dependencies=[Depends(authent)],
)

api.include_router(
    jobs.router,
    prefix="/jobs",
    tags=["Jobs"],
    #dependencies=[Depends(authent)],
)
api.include_router(
    profit_loss.router,
    prefix="/profit_loss",
    tags=["Profit Loss"],
    #dependencies=[Depends(authent)],
)

api.include_router(
    services.router,
    prefix="/services",
    tags=["Services"],
    #dependencies=[Depends(authent)],
)



