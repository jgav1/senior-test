from typing import TYPE_CHECKING, Optional
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import datetime, timezone
import uuid
from decimal import Decimal

if TYPE_CHECKING:
    from api.public.parts.models import Parts


class PartsMarketDataBase(SQLModel):
    purchase_price: Decimal = Field(nullable=False)
    sell_price: Decimal = Field(nullable=False)

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "purchase_price": "150.00",
                    "sell_price": "200.00",
                }
            ]
        }
    }

class PartsMarketData(PartsMarketDataBase, table=True):
    id: uuid.UUID | None = Field(default_factory=uuid.uuid4, primary_key=True)
    parts_id: uuid.UUID = Field(foreign_key="parts.id", nullable=False)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc), nullable=True)

    parts: Optional["Parts"] = Relationship(back_populates=None)  # one-way relationship

class PartsMarketDataCreate(PartsMarketDataBase):
    parts_id: uuid.UUID
    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "parts_id": "123e4567-e89b-12d3-a456-426614174000",
                    "purchase_price": "150.00",
                    "sell_price": "200.00",
                }
            ]
        }
    }

class PartsMarketDataRead(PartsMarketDataBase):
    id: uuid.UUID
    parts_id: uuid.UUID
    purchase_price: Decimal
    sell_price: Decimal

class PartsMarketDataUpdate(PartsMarketDataBase):
    purchase_price: Optional[Decimal] = None
    sell_price: Optional[Decimal] = None
    parts_id: Optional[uuid.UUID] = None

PartsMarketData.model_rebuild()
