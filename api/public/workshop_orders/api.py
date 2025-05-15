# app/routes/vehicle_type_routes.py

from fastapi import Depends
from sqlmodel import Session
from api.database import get_session
from api.public.workshop_orders.models import *
from api.public.workshop_orders.crud import *
from api.utils.api_router import get_crud_router
from uuid import UUID
from typing import List



router = get_crud_router(
    model=WorkShopOrders,
    create_schema=WorkShopOrdersCreate,
    update_schema=WorkShopOrdersUpdate,
    read_schema=WorkShopOrdersRead,
    crud=crud_workshop_orders,
)

crud_workshop_orders_jobs = crud_workshop_orders_jobs_catalog

@router.get("/{workshop_orders_id}/jobs", response_model=List[OrderJobsRead])
def get_jobs(workshop_orders_id: UUID, db: Session = Depends(get_session)):
    return crud_workshop_orders_jobs.get_jobs_for_workshop_orders(db, workshop_orders_id)

@router.post("/{workshop_orders_id}/jobs/{jobs_id}", response_model=OrderJobsRead)
def link_part_to_vehicle(
    link_data: OrderJobsCreate,
    db: Session = Depends(get_session)
):
    return crud_workshop_orders_jobs.create(db, link_data)

@router.delete("/{workshop_orders_id}/jobs/{jobs_id}", response_model=bool)
def unlink_part(workshop_orders_id: UUID, jobs_id: UUID, db: Session = Depends(get_session)):
    return crud_workshop_orders_jobs.delete(db, workshop_orders_id, jobs_id)