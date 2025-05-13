from typing import TYPE_CHECKING, Optional
from sqlmodel import Field, Relationship, SQLModel 
from typing import Optional, List
from datetime import datetime, timezone
from enum import Enum
import uuid
from pydantic import EmailStr
if TYPE_CHECKING:
    from api.public.customer_orders.models import CustomerOrder
    from api.public.vehicles.models import Vehicle
    #from workshop.models import Workshop


class CustomerBase(SQLModel):
    name: str = Field(max_length=100)
    last_name: str = Field(max_length=100)
    email: EmailStr = Field(max_length=100, unique=True)
    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "name": "John",
                    "last_name": "Doe",
                    "email": "example@example.com",
                }
            ]
        }
    }

class Customer(CustomerBase, table=True):
    id: uuid.UUID | None = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc), nullable=True)
    vehicles: List["Vehicle"] = Relationship(back_populates=None, cascade_delete=True)  # one-way relationship
    customer_orders: List["CustomerOrder"] = Relationship(back_populates=None, cascade_delete=True)  # one-way relationship

class CustomerCreate(CustomerBase):
    pass

class CustomerRead(CustomerBase):
    id: uuid.UUID
    name: str
    last_name: str
    email: EmailStr
class CustomerUpdate(CustomerBase):
    name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None


   