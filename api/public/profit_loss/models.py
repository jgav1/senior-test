from typing import TYPE_CHECKING, Optional
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import datetime, timezone
import uuid
from decimal import Decimal

if TYPE_CHECKING:
    from api.public.workshop_orders.models import WorkShopOrders


class ProfitLossBase(SQLModel):
    total_profit_loss: Decimal = Field(default=0.00, nullable=False)

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "total_profit_loss": "2000.00",
                }
            ]
        }
    }

class ProfitLoss(ProfitLossBase, table=True):
    id: uuid.UUID | None = Field(default_factory=uuid.uuid4, primary_key=True)
    workshop_orders_id: uuid.UUID = Field(foreign_key="workshoporders.id", nullable=False)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc), nullable=True)

    workshop_orders: Optional["WorkShopOrders"] = Relationship(back_populates="profit_loss")  # one-way relationship

class ProfitLossCreate(ProfitLossBase):
    workshop_orders_id: uuid.UUID
    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "workshop_orders_id": "123e4567-e89b-12d3-a456-426614174000",
                    "total_profit_loss": "2000.00",
                }
            ]
        }
    }

class ProfitLossRead(ProfitLossBase):
    id: uuid.UUID
    workshop_orders_id: uuid.UUID
    total_profit_loss: Decimal

class ProfitLossUpdate(ProfitLossBase):
    workshop_orders_id: Optional[uuid.UUID] = None
    total_profit_loss: Optional[Decimal] = None

ProfitLoss.model_rebuild()
