# app/routes/vehicle_type_routes.py

from fastapi import Depends
from sqlmodel import Session
from api.public.parts.models import *
from api.public.parts.crud import crud_parts
from api.utils.api_router import get_crud_router
from api.public.vehicle_parts_catalog.models import *
from api.database import get_session
from uuid import UUID
from typing import List
from api.public.parts.crud import crud_vehicle_parts_catalog


router = get_crud_router(
    model=Parts,
    create_schema=PartsCreate,
    update_schema=PartsUpdate,
    read_schema=PartsRead,
    crud=crud_parts,
)

crud_vehicle_parts = crud_vehicle_parts_catalog

@router.get("/{part_id}/vehicle_type", response_model=List[VehiclePartsLinkRead])
def get_parts(part_id: UUID, db: Session = Depends(get_session)):
    return crud_vehicle_parts.get_vehicle_types_for_part(db, part_id)

@router.post("/parts", response_model=VehiclePartsLinkRead)
def link_part_to_vehicle(
    link_data: VehiclePartsLinkCreate,
    db: Session = Depends(get_session)
):
    return crud_vehicle_parts.create(db, link_data)

@router.delete("{part_id}/vehicle_type/{vehicletype_id}", response_model=bool)
def unlink_part(vehicletype_id: UUID, part_id: UUID, db: Session = Depends(get_session)):
    return crud_vehicle_parts.delete(db, vehicletype_id, part_id)