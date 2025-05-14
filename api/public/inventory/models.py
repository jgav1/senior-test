from typing import TYPE_CHECKING, Optional
from sqlmodel import Field, Relationship, SQLModel 
from typing import Optional, List
from datetime import datetime, timezone
from enum import Enum
import uuid

if TYPE_CHECKING:
    from api.public.skus.models import SKU

class InventoryBase(SQLModel):
    quantity: int = Field(default=0, nullable=False)

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "quantity": 10,
                }
            ]
        }
    }

class Inventory(InventoryBase, table=True):
    id: uuid.UUID | None = Field(default_factory=uuid.uuid4, primary_key=True)
    sku_id: uuid.UUID = Field(foreign_key="sku.id", nullable=False)
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc), nullable=True)
    vehicle_type_id: uuid.UUID = Field(foreign_key="vehicletype.id", nullable=False)

    sku: Optional["Sku"] = Relationship(back_populates=None)  # one-way relationship

class InventoryCreate(InventoryBase):
    sku_id: uuid.UUID
    quantity: int
    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "sku_id": "123e4567-e89b-12d3-a456-426614174000",
                    "quantity": 10,
                }
            ]
        }
    }

class InventoryRead(InventoryBase):
    id: uuid.UUID
    sku_id: uuid.UUID
    quantity: int

class InventoryUpdate(InventoryBase):
    sku_id: Optional[uuid.UUID] = None
    quantity: Optional[int] = None
    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "sku_id": "123e4567-e89b-12d3-a456-426614174000",
                    "quantity": 10,
                }
            ]
        }
    }


Inventory.model_rebuild()