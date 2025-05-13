# app/routes/vehicle_type_routes.py

from fastapi import  Depends
from sqlmodel import Session
from api.public.vehicle_types.models import *
from api.public.vehicle_types.crud import *
from api.utils.api_router import *
from api.public.vehicle_parts_catalog.models import *
from api.database import get_session
from uuid import UUID
from typing import List


router = get_crud_router(
    model=VehicleType,
    create_schema=VehicleTypeCreate,
    update_schema=VehicleTypeUpdate,
    read_schema=VehicleTypeRead,
    crud=crud_vehicle_types,
)

crud_vehicle_parts = crud_vehicle_parts_catalog

@router.get("/{vehicletype_id}/parts", response_model=List[VehiclePartsLinkRead])
def get_parts(vehicletype_id: UUID, db: Session = Depends(get_session)):
    return crud_vehicle_parts.get_parts_for_vehicle(db, vehicletype_id)

@router.post("/parts", response_model=VehiclePartsLinkRead)
def link_part_to_vehicle(
    link_data: VehiclePartsLinkCreate,
    db: Session = Depends(get_session)
):
    return crud_vehicle_parts.create(db, link_data)

@router.delete("/{vehicletype_id}/parts/{part_id}", response_model=bool)
def unlink_part(vehicletype_id: UUID, part_id: UUID, db: Session = Depends(get_session)):
    return crud_vehicle_parts.delete(db, vehicletype_id, part_id)

