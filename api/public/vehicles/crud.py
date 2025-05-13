from fastapi import Depends
from sqlmodel import Session, text, select
from api.config import settings
from api.database import get_session
from api.public.vehicles.models import *
from api.utils.logger import logger_config
from api.public.vehicles.exceptions import *
from uuid import UUID

logger = logger_config(__name__)


def read_vehicles(db: Session = Depends(get_session)):
    try:
        statement = select(Vehicle)
        results = db.exec(statement)
        vehicles = results.all()
        Vehicle()
        if not vehicles:
            logger.error("No vehicles found.")
            return []
        return vehicles
    except Exception as e:
        logger.error(f"Error fetching vehicles: {e}")
        return {"error": str(e)}
    
def read_vehicle(vehicle_id: UUID, db: Session = Depends(get_session)):
    try:
        if vehicle_id:
            vehicle = db.get(Vehicle, vehicle_id)
            if not vehicle:
                logger.error(f"Vehicle with id {vehicle_id} not found.")
                return []
            return vehicle
    except Exception as e:
        logger.error(f"Error fetching vehicles: {e}")
        raise VehicleNotFound(str(e))

def post_vehicle(vehicle: VehicleCreate, db: Session = Depends(get_session)):
    try:
        vehicle_to_db = Vehicle(license_plate=vehicle.license_plate, vin=vehicle.vin)
        db.add(vehicle_to_db)
        db.commit()
        db.refresh(vehicle_to_db)
        logger.info(f"Vehicle {vehicle_to_db.id} created successfully.")
        return vehicle_to_db
    except Exception as e:
        logger.error(f"Error creating vehicle: {e}")
        raise VehicleAlreadyExists(str(e))
def patch_vehicle(vehicle_id: UUID, vehicle: VehicleUpdate, db: Session = Depends(get_session)):
    try:
        db_vehicle = db.get(Vehicle, vehicle_id)
        if not db_vehicle:
            logger.error(f"Vehicle with id {vehicle_id} not found.")
            return []
        vehicle_data = vehicle.model_dump(exclude_unset=True)
        for key, value in vehicle_data.items():
            setattr(db_vehicle, key, value)
        db_vehicle.updated_at = datetime.now(timezone.utc)
        db.add(db_vehicle)
        db.commit()
        db.refresh(db_vehicle)
        logger.info(f"Vehicle {db_vehicle.id} updated successfully.")
        return db_vehicle
    except Exception as e:
        logger.error(f"Error updating vehicle: {e}")
        raise VehicleNotFound(str(e))
        

def delete_vehicle(vehicle_id: UUID, db: Session = Depends(get_session)):
    try:
        db_vehicle = db.get(Vehicle, vehicle_id)
        if not db_vehicle:
            logger.error(f"Vehicle with id {vehicle_id} not found.")
            return []
        db.delete(db_vehicle)
        db.commit()
        logger.info(f"Vehicle {db_vehicle.id} deleted successfully.")
        return {"message": "Vehicle deleted successfully"}
    except Exception as e:
        logger.error(f"Error deleting vehicle: {e}")
        raise VehicleNotFound(str(e))
    