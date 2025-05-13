from typing import TYPE_CHECKING, Optional
from sqlmodel import Field, Relationship, SQLModel
from typing import Optional, List
from datetime import datetime, timezone
from enum import Enum
import uuid
from pydantic import field_validator
from api.public.vehicle_parts_catalog.models import VehiclePartsLink
if TYPE_CHECKING:
    from api.public.vehicles.models import Vehicle
    from api.public.parts.models import Parts



class VehicleTypeBase(SQLModel):
    model: str = Field(max_length=100)
    company: str = Field(max_length=100)
    year: int = Field(ge=1886, le=datetime.now().year)  # Cars were invented in 1886
    version: str = Field(max_length=100)
    color: str = Field(max_length=100)

    @field_validator("model", "company", "version", "color", mode="before")
    @classmethod
    def lowercase_fields(cls, value: str) -> str:
        if isinstance(value, str):
            return value.lower()
        return value

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "model": "cx-5",
                    "company": "mazda",
                    "year": 2024,
                    "version": "sport",
                    "color": "black",
                }
            ]
        }
    }

class VehicleType(VehicleTypeBase, table=True):
    id: uuid.UUID | None = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc), nullable=True)
    vehicles: List["Vehicle"] = Relationship(back_populates=None)  # one-way relationship
    parts: List["Parts"] = Relationship(back_populates="vehicle_types", link_model=VehiclePartsLink)  # many-to-many relationship


class VehicleTypeCreate(VehicleTypeBase):
    pass

class VehicleTypeRead(VehicleTypeBase):
    id: uuid.UUID
    model: str
    company: str
    year: int
    version: str
    color: str
class VehicleTypeUpdate(VehicleTypeBase):
    model: Optional[str] = None
    company: Optional[str] = None
    year: Optional[int] = None
    version: Optional[str] = None
    color: Optional[str] = None
    


VehicleType.model_rebuild()