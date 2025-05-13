from typing import TYPE_CHECKING, Optional
from sqlmodel import Field, Relationship, SQLModel 
from typing import Optional, List
from datetime import datetime, timezone
from enum import Enum
import uuid
if TYPE_CHECKING:
    from api.public.customer_orders.models import CustomerOrder
    from api.public.customers.models import Customer
    from api.public.vehicle_types.models import VehicleType



class VehicleBase(SQLModel):
    license_plate: str = Field(max_length=100, unique=True)
    vin: str = Field(max_length=100, unique=True)
    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "license_plate": "AAA-1234",
                    "vin": "1HGCM82633A123456",
                }
            ]
        }
    }

class Vehicle(VehicleBase, table=True):
    id: uuid.UUID | None = Field(default_factory=uuid.uuid4, primary_key=True)
    customer_id: uuid.UUID = Field(foreign_key="customer.id", nullable=False)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc), nullable=True)
    vehicle_type_id: uuid.UUID = Field(foreign_key="vehicletype.id", nullable=False)
    
    customer: Optional["Customer"] = Relationship(back_populates=None)  # one-way relationship
    customer_orders: List["CustomerOrder"] = Relationship(back_populates=None, cascade_delete=True)  # one-way relationship
    vehicle_type: Optional["VehicleType"] = Relationship(back_populates=None)  # one-way relationship

class VehicleCreate(VehicleBase):
    customer_id: uuid.UUID
    vehicle_type_id: uuid.UUID
    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "customer_id": "123e4567-e89b-12d3-a456-426614174000",
                    "license_plate": "AAA-1234",
                    "vin": "1HGCM82633A123456",
                    "vehicle_type_id": "123e4567-e89b-12d3-a456-426614174000",
                }
            ]
        }
    }

class VehicleRead(VehicleBase):
    id: uuid.UUID
    customer_id: uuid.UUID
    license_plate: str
    vin: str
    vehicle_type_id: uuid.UUID
class VehicleUpdate(VehicleBase):
    license_plate: Optional[str] = None
    vin: Optional[str] = None
    customer_id: Optional[uuid.UUID] = None
    vehicle_type_id: Optional[uuid.UUID] = None
    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "license_plate": "AAA-1234",
                    "vin": "1HGCM82633A123456",
                    "customer_id": "123e4567-e89b-12d3-a456-426614174000",
                    "vehicle_type_id": "123e4567-e89b-12d3-a456-426614174000",
                }
            ]
        }
    }


Vehicle.model_rebuild()