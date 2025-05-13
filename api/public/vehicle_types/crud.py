from fastapi import Depends
from sqlmodel import Session, text, select
from api.config import settings
from api.database import get_session
from api.public.vehicle_types.models import *
from api.utils.logger import logger_config
from api.public.vehicle_types.exceptions import *
from uuid import UUID

logger = logger_config(__name__)


def read_vehicles_types(db: Session = Depends(get_session)):
    try:
        statement = select(VehicleType)
        results = db.exec(statement)
        vehicleType = results.all()
        VehicleType()
        if not vehicleType:
            logger.error("No vehicles types found.")
            return []
        return vehicleType
    except Exception as e:
        logger.error(f"Error fetching vehicles: {e}")
        return {"error": str(e)}
    
def read_vehicle_type(vehicle_type_id: UUID, db: Session) -> VehicleType:
    vehicle_type = db.get(VehicleType, vehicle_type_id)
    if not vehicle_type:
        logger.error(f"Vehicle type {vehicle_type_id} not found.")
        raise HTTPException(status_code=404, detail="Vehicle type not found")
    return vehicle_type


def post_vehicle_type(vehicletype: VehicleTypeCreate, db: Session = Depends(get_session)):
    try:
        vehicle_type_to_db = VehicleType(**vehicletype.model_dump())
        db.add(vehicle_type_to_db)
        db.commit()
        db.refresh(vehicle_type_to_db)
        logger.info(f"Vehicle type {vehicle_type_to_db.id} created successfully.")
        return vehicle_type_to_db
    except Exception as e:
        logger.error(f"Error creating vehicle: {e}")
        raise VehicleTypeAlreadyExists(str(e))
    
def patch_vehicle_type(vehicle_type_id: UUID, vehicleType: VehicleTypeUpdate, db: Session = Depends(get_session)):
    try:
        db_vehicle_type = db.get(VehicleType, vehicle_type_id)
        if not db_vehicle_type:
            logger.error(f"Vehicle Type with id {vehicle_type_id} not found.")
            return []
        vehicle_type_data = vehicleType.model_dump(exclude_unset=True)
        for key, value in vehicle_type_data.items():
            setattr(db_vehicle_type, key, value)
        db_vehicle_type.updated_at = datetime.now(timezone.utc)
        db.add(db_vehicle_type)
        db.commit()
        db.refresh(db_vehicle_type)
        logger.info(f"Vehicle Type {db_vehicle_type.id} updated successfully.")
        return db_vehicle_type
    except Exception as e:
        logger.error(f"Error updating vehicle type: {e}")
        raise VehicleTypeNotFound(str(e))
        

def delete_vehicle_type(vehicle_type_id: UUID, db: Session = Depends(get_session)):
    try:
        db_vehicle_type = db.get(VehicleType, vehicle_type_id)
        if not db_vehicle_type:
            logger.error(f"Vehicle Type with id {vehicle_type_id} not found.")
            return []
        db.delete(db_vehicle_type)
        db.commit()
        logger.info(f"Vehicle Type {db_vehicle_type.id} deleted successfully.")
        return {"message": "VehicleType deleted successfully"}
    except Exception as e:
        logger.error(f"Error deleting vehicle type: {e}")
        raise VehicleTypeNotFound(str(e))
    