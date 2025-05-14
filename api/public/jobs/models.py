from typing import TYPE_CHECKING, Optional
from sqlmodel import Field, Relationship, SQLModel
from typing import Optional, List
from datetime import datetime, timezone
from enum import Enum
import uuid
from api.public.order_jobs.models import OrderJobs
from api.public.job_parts.models import JobParts
from decimal import Decimal
if TYPE_CHECKING:
    from api.public.workshop_orders.models import WorkShopOrders
    from api.public.skus.models import Sku

class jobTypes(str, Enum):
    directSale = "direct_sale"
    repair = "repair"


class JobsBase(SQLModel):
    description: str = Field(max_length=350, nullable=False)
    total_profit: Decimal = Field(default=0.0, nullable=False)
    total_fixed_cost: Decimal = Field(default=0.0, nullable=False)
    job_type : jobTypes = Field(default=jobTypes.repair, nullable=False)    
    max_days: int = Field(default=2, nullable=False)
    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "description": "Car needs a engine test, and serveral other tasks.",
                    "total_profit": 100.0,
                    "total_fixed_cost": 50.0,
                    "job_type": "repair",
                    "max_days": 10,
                }
            ]
        }
    }


class Jobs(JobsBase, table=True):
    id: uuid.UUID | None = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc), nullable=True)
    #add jobparts
    skus: List["Sku"] = Relationship(back_populates="jobs", link_model=JobParts)  # many-to-many relationship
    workshop_orders: List["WorkShopOrders"] = Relationship(back_populates="jobs", link_model=OrderJobs)  # one-way relationship

    """
    vehicles: List["Vehicle"] = Relationship(back_populates=None)  # one-way relationship
    parts: List["Parts"] = Relationship(back_populates="vehicle_types", link_model=VehiclePartsLink)  # many-to-many relationship
    """

class JobsCreate(JobsBase):
    pass

class JobsRead(JobsBase):
    id: uuid.UUID
    description: str
    total_profit: Decimal
    total_fixed_cost: Decimal
    job_type: jobTypes    
    max_days: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "id": "123e4567-e89b-12d3-a456-426614174000",
                    "description": "General engine inspection",
                    "total_profit": 10.0,
                    "total_fixed_cost": 5.0,
                    "job_type": "repair",
                    "max_days": 1,
                    "created_at": "2023-10-01T12:00:00Z",
                    "updated_at": "2023-10-01T12:00:00Z",
                }
            ]
        }
    }
class JobsUpdate(JobsBase):
    description: Optional[str] = None
    total_profit: Optional[Decimal] = None
    total_fixed_cost: Optional[Decimal] = None
    job_type: Optional[jobTypes] = None    
    max_days: Optional[int] = None
    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "description": "General engine inspection",
                    "total_profit": 10.0,
                    "total_fixed_cost": 5.0,
                    "job_type": "repair",
                    "max_days": 1,
                }
            ]
        }
    }
    


Jobs.model_rebuild()