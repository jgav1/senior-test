# app/routes/vehicle_type_routes.py

from fastapi import  Depends
from sqlmodel import Session
from api.public.jobs.models import *
from api.public.jobs.crud import *
from api.utils.api_router import *
from api.public.order_jobs.models import *
from api.database import get_session
from uuid import UUID
from typing import List

# Normal CRUD operations for Jobs
router = get_crud_router(
    model=Jobs,
    create_schema=JobsCreate,
    update_schema=JobsUpdate,
    read_schema=JobsRead,
    crud=crud_jobs,
)


# Routes for Jobs Workshop Orders
@router.get("/{jobs_id}/workshop_orders", response_model=List[OrderJobsRead])
def get_workshop_orders(jobs_id: UUID, db: Session = Depends(get_session)):
    return crud_workshop_orders_jobs_catalog.get_workshop_orders_for_jobs(db, jobs_id)

@router.post("/workshop_orders", response_model=OrderJobsRead)
def link_part_to_vehicle(
    link_data: OrderJobsCreate,
    db: Session = Depends(get_session)
):
    return crud_workshop_orders_jobs_catalog.create(db, link_data)

@router.delete("/{jobs_id}/workshop_orders/{part_id}", response_model=bool)
def unlink_part(jobs_id: UUID, part_id: UUID, db: Session = Depends(get_session)):
    return crud_workshop_orders_jobs_catalog.delete(db, jobs_id, part_id)


# Routes for SKU Jobs Catalog

@router.get("/{jobs_id}/sku", response_model=List[JobPartsRead])
def get_sku(jobs_id: UUID, db: Session = Depends(get_session)):
    return crud_sku_jobs_catalog.get_sku_jobs_catalog(db, jobs_id)

@router.post("/sku", response_model=JobPartsRead)
def create_sku_jobs_link(
    link_data: JobPartsCreate,
    db: Session = Depends(get_session)
):
    return crud_sku_jobs_catalog.create(db, link_data)

@router.delete("/{jobs_id}/sku/{sku_id}", response_model=bool)
def delete_sku_jobs_link(jobs_id: UUID, sku_id: UUID, db: Session = Depends(get_session)):
    return crud_sku_jobs_catalog.delete(db, jobs_id, sku_id)

