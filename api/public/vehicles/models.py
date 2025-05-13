from sqlmodel import Field, Relationship, SQLModel 
from typing import Optional, List
from datetime import datetime, timezone
from enum import Enum
import uuid





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
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc), nullable=True)

class VehicleCreate(VehicleBase):
    pass

class VehicleRead(VehicleBase):
    id: uuid.UUID
    license_plate: str
    vin: str
class VehicleUpdate(VehicleBase):
    license_plate: Optional[str] = None
    vin: Optional[str] = None


   