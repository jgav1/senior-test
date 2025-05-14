from typing import TYPE_CHECKING, Optional
from sqlmodel import Field, Relationship, SQLModel 
from typing import Optional, List
from datetime import datetime, timezone
from enum import Enum
import uuid
from api.public.order_jobs.models import OrderJobs
from decimal import Decimal
from api.public.jobs.models import Jobs
if TYPE_CHECKING:
    from api.public.customer_orders.models import CustomerOrder
    from api.public.profit_loss.models import ProfitLoss
    
    


class stateStatus(str, Enum):
    created = "created"
    in_progress = "in_progress"
    completed = "completed"
    cancelled = "cancelled"

class WorkShopOrdersBase(SQLModel):
    description: str = Field(max_length=350, nullable=False)
    total_profit: Decimal = Field(default=0.0, nullable=False)
    total_fixed_cost: Decimal = Field(default=0.0, nullable=False)
    total_variable_cost: Decimal = Field(default=0.0, nullable=False)
    state : stateStatus = Field(default=stateStatus.created, nullable=False)
    max_days: int = Field(default=10, nullable=False)
    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "description": "Car needs a engine test, and serveral other tasks.",
                    "total_profit": 100.0,
                    "total_fixed_cost": 50.0,
                    "total_variable_cost": 25.0,
                    "state": "created",
                    "max_days": 10,
                }
            ]
        }
    }

class WorkShopOrders(WorkShopOrdersBase, table=True):
    id: uuid.UUID | None = Field(default_factory=uuid.uuid4, primary_key=True)
    customer_order_id: uuid.UUID = Field(foreign_key="customerorder.id", nullable=False)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc), nullable=True)
    customer_orders: Optional["CustomerOrder"] = Relationship(back_populates=None)  # one-way relationship
    profit_loss: Optional["ProfitLoss"] = Relationship(back_populates="workshop_orders", cascade_delete=True)  # one-way relationship
    jobs: List["Jobs"] = Relationship(back_populates="workshop_orders", link_model=OrderJobs)  # one-way relationship

    

class WorkShopOrdersCreate(WorkShopOrdersBase):
    customer_order_id: uuid.UUID
    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "customer_order_id": "123e4567-e89b-12d3-a456-426614174000",
                    "description": "Car needs a engine test, and serveral other tasks.",
                    "total_profit": 100.0,
                    "total_fixed_cost": 50.0,
                    "total_variable_cost": 25.0,
                    "state": "created",
                    "max_days": 10,
                }
            ]
        }
    }

class WorkShopOrdersRead(WorkShopOrdersBase):
    id: uuid.UUID
    customer_order_id: uuid.UUID
    description: str
    total_profit: Decimal
    total_fixed_cost: Decimal
    total_variable_cost: Decimal
    state: stateStatus
    max_days: int    
    created_at: datetime
    updated_at: datetime
    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "id": "123e4567-e89b-12d3-a456-426614174000",
                    "customer_order_id": "123e4567-e89b-12d3-a456-426614174000",
                    "description": "Car needs a engine test, and serveral other tasks.",
                    "total_profit": 100.0,
                    "total_fixed_cost": 50.0,
                    "total_variable_cost": 25.0,
                    "state": "created",
                    "max_days": 10,
                    "created_at": "2023-10-01T12:00:00Z",
                    "updated_at": "2023-10-01T12:00:00Z",
                }
            ]
        }
    }

class WorkShopOrdersUpdate(WorkShopOrdersBase):
    customer_order_id: Optional[uuid.UUID] = None
    description: Optional[str] = None
    total_profit: Optional[Decimal] = None
    total_fixed_cost: Optional[Decimal] = None
    total_variable_cost: Optional[Decimal] = None
    state: Optional[stateStatus] = None
    max_days: Optional[int] = None
    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "customer_order_id": "123e4567-e89b-12d3-a456-426614174000",
                    "description": "Car needs a engine test, and serveral other tasks.",
                    "total_profit": 100.0,
                    "total_fixed_cost": 50.0,
                    "total_variable_cost": 25.0,
                    "state": "created",
                    "max_days": 10,
                }
            ]
        }
    }

WorkShopOrders.model_rebuild()

   