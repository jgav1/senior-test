from fastapi import APIRouter, Depends, status
from api.utils.logger import logger_config
from sqlmodel import Session
from api.database import get_session
from uuid import UUID
from api.public.vehicles.models import *
from api.public.vehicles.crud import *





router = APIRouter()

logger = logger_config(__name__)

@router.get("/test")
async def get_vehicles():
    return {"test endpoint": "reachable!"}


@router.get("", response_model=list[VehicleRead])
async def get_all_vehicles(db: Session = Depends(get_session)):
    return read_vehicles(db=db)

@router.get("/{vehicle_id}", response_model=VehicleRead)
async def get_vehicles(vehicle_id:UUID, db: Session = Depends(get_session)):
    return read_vehicle(vehicle_id=vehicle_id, db=db)

@router.post("", response_model=VehicleRead)
def create_vehicle(vehicle: VehicleCreate, db: Session = Depends(get_session)):
    return post_vehicle(vehicle=vehicle, db=db)

@router.patch("/{vehicle_id}", response_model=VehicleRead)
def update_vehicle(vehicle_id:UUID, vehicle:VehicleUpdate, db: Session = Depends(get_session)):
    return patch_vehicle(vehicle_id=vehicle_id, vehicle=vehicle, db=db)

@router.delete("/{vehicle_id}")
def remove_vehicle(vehicle_id:UUID, db: Session = Depends(get_session)):
    return delete_vehicle(vehicle_id=vehicle_id, db=db)
