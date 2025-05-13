from fastapi import APIRouter, Depends, status
from api.utils.logger import logger_config
from sqlmodel import Session
from api.database import get_session
from uuid import UUID
from api.public.vehicle_types.models import *
from api.public.vehicle_types.crud import *





router = APIRouter()

logger = logger_config(__name__)

@router.get("/test")
async def get_vehicles_type():
    return {"test endpoint": "reachable!"}


@router.get("", response_model=list[VehicleTypeRead])
async def get_all_vehicles_types(db: Session = Depends(get_session)):
    return read_vehicles_types(db=db)

@router.get("/{vehicle_type_id}", response_model=VehicleTypeRead)
async def get_vehicle_type(vehicle_type_id:UUID, db: Session = Depends(get_session)):
    return read_vehicle_type(vehicle_type_id=vehicle_type_id, db=db)

@router.post("", response_model=VehicleTypeRead)
def create_vehicle_type(vehicletype: VehicleTypeCreate, db: Session = Depends(get_session)):
    return post_vehicle_type(vehicletype=vehicletype, db=db)

@router.patch("/{vehicle_type_id}", response_model=VehicleTypeRead)
def update_vehicle_type(vehicle_type_id:UUID, vehicleType:VehicleTypeUpdate, db: Session = Depends(get_session)):
    return patch_vehicle_type(vehicle_type_id=vehicle_type_id, vehicleType=vehicleType, db=db)

@router.delete("/{vehicle_type_id}")
def remove_vehicle_type(vehicle_type_id:UUID, db: Session = Depends(get_session)):
    return delete_vehicle_type(vehicle_type_id=vehicle_type_id, db=db)
