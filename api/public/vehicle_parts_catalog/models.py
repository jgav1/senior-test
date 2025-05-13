from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime, timezone
import uuid


class VehiclePartsLink(SQLModel, table=True):
    vehicletype_id: uuid.UUID | None = Field(default=None, foreign_key="vehicletype.id", primary_key=True)
    part_id: uuid.UUID | None = Field(default=None, foreign_key="parts.id", primary_key=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc), nullable=True)

VehiclePartsLink.model_rebuild()