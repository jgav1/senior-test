from typing import TYPE_CHECKING, Optional
from sqlmodel import Field, Relationship, SQLModel 
from typing import Optional, List
from datetime import datetime, timezone
from enum import Enum
import uuid
from pydantic import EmailStr, field_validator

from api.public.workshop_orders.models import WorkShopOrders
if TYPE_CHECKING:
    from api.public.vehicles.models import Vehicle
    from api.public.customers.models import Customer
    
    #from workshop.models import Workshop


class CustomerOrderBase(SQLModel):
    description: str = Field(max_length=250, nullable=False)
    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "description": "Car needs repair, it does not start",
                }
            ]
        }
    }
    @field_validator("description", mode="before")
    @classmethod
    def lowercase_fields(cls, value: str) -> str:
        if isinstance(value, str):
            return value.lower()
        return value


class CustomerOrder(CustomerOrderBase, table=True):
    id: uuid.UUID | None = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc), nullable=True)
    customer_id: uuid.UUID = Field(foreign_key="customer.id", nullable=False)
    vehicle_id: uuid.UUID = Field(foreign_key="vehicle.id", nullable=False)

    vehicle: Optional["Vehicle"] = Relationship(back_populates=None)  # one-way relationship
    customer: Optional["Customer"] = Relationship(back_populates=None)  # one-way relationship
    workshop_orders: Optional["WorkShopOrders"] = Relationship(back_populates=None)  # one-way relationship

class CustomerOrderCreate(CustomerOrderBase):
    vehicle_id: uuid.UUID
    customer_id: uuid.UUID
    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "vehicle_id": "123e4567-e89b-12d3-a456-426614174000",
                    "customer_id": "123e4567-e89b-12d3-a456-426614174000",
                    "description": "Car needs repair, it does not start",
                }
            ]
        }
    }
    

class CustomerOrderRead(CustomerOrderBase):
    id: uuid.UUID
    description: str
    vehicle_id: uuid.UUID
    customer_id: uuid.UUID
class CustomerOrderUpdate(CustomerOrderBase):
    description: Optional[str] = None
    vehicle_id: Optional[uuid.UUID] = None
    customer_id: Optional[uuid.UUID] = None


CustomerOrder.model_rebuild()  