# app/routes/vehicle_type_routes.py
from fastapi import  Depends
from sqlmodel import Session
from fastapi import APIRouter
from api.public.skus.models import *
from api.public.skus.crud import *
from api.utils.api_router import get_crud_router
from api.public.order_jobs.models import *
from api.database import get_session
from uuid import UUID
from typing import List

# Normal CRUD operations for SKU
router = get_crud_router(
    model=Sku,
    create_schema=SkuCreate,
    update_schema=SkuUpdate,
    read_schema=SkuRead,
    crud=crud_sku_type,
)

# Routes for SKU Jobs Catalog

@router.get("/{sku_id}/jobs", response_model=List[JobPartsRead])
def get_job(sku_id: UUID, db: Session = Depends(get_session)):
    return crud_sku_jobs_catalog.get_jobs_for_sku(db, sku_id)

@router.post("/jobs", response_model=JobPartsRead)
def create_jobs_sku_link(
    link_data: JobPartsCreate,
    db: Session = Depends(get_session)
):
    return crud_sku_jobs_catalog.create(db, link_data)

@router.delete("/{sku_id}/jobs/{jobs_id}", response_model=bool)
def delete_jobs_sku_link(sku_id: UUID, jobs_id: UUID, db: Session = Depends(get_session)):
    return crud_sku_jobs_catalog.delete(db, sku_id, jobs_id)