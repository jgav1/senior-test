from typing import TYPE_CHECKING, Optional
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime, timezone
import uuid
from api.public.vehicle_parts_catalog.models import VehiclePartsLink
if TYPE_CHECKING:
    from api.public.skus.models import Sku
    from api.public.part_market_data.models import PartsMarketData
    from api.public.vehicle_types.models import VehicleType

class PartsBase(SQLModel):
    quantity: int = Field(nullable=False)

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "quantity": "5",
                }
            ]
        }
    }

class Parts(PartsBase, table=True):
    id: uuid.UUID | None = Field(default_factory=uuid.uuid4, primary_key=True)
    sku_id: uuid.UUID = Field(foreign_key="sku.id", nullable=False)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc), nullable=True)

    sku: Optional["Sku"] = Relationship(back_populates=None)  # one-way relationship
    parts_market_data: Optional["PartsMarketData"] = Relationship(back_populates=None, cascade_delete=True)  # one-way relationship
    vehicle_types: list["VehicleType"] = Relationship(back_populates="parts", link_model=VehiclePartsLink)  # many-to-many relationship

class PartsCreate(PartsBase):
    sku_id: uuid.UUID
    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "sku_id": "123e4567-e89b-12d3-a456-426614174000",
                    "quantity": "5",
                }
            ]
        }
    }

class PartsRead(PartsBase):
    id: uuid.UUID
    sku_id: uuid.UUID
    quantity: int

class PartsUpdate(PartsBase):
    quantity: Optional[int] = None
    sku_id: Optional[uuid.UUID] = None

Parts.model_rebuild()
