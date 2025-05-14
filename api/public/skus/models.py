from typing import TYPE_CHECKING, Optional
from sqlmodel import Field, SQLModel, Relationship
from typing import Optional
from datetime import datetime, timezone
from enum import Enum
import uuid
from pydantic import field_validator
from api.public.job_parts.models import JobParts
if TYPE_CHECKING:
    from api.public.parts.models import Parts
    from api.public.inventory.models import Inventory
    from api.public.jobs.models import Jobs

class sizeEnum(str, Enum):
    xxs = "xxs"
    xs = "xs"
    s = "s"
    m = "m"
    l = "l"
    xl = "xl"

class SkuBase(SQLModel):
    sku_value: str = Field(max_length=200, unique=True)
    size: sizeEnum = Field(default=sizeEnum.m, nullable=False)
    description: str = Field(max_length=200)

    @field_validator("sku_value", "description", mode="before")
    @classmethod
    def lowercase_fields(cls, value: str) -> str:
        if isinstance(value, str):
            return value.lower()
        return value

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "sku_value": "ABC-12345-S-BL",
                    "size": "xs",
                    "description": "Generic Automotive Part",
                }
            ]
        }
    }

class Sku(SkuBase, table=True):
    id: uuid.UUID | None = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc), nullable=True)
    parts: list["Parts"] = Relationship(back_populates=None, cascade_delete=True)  # one-way relationship
    inventory: list["Inventory"] = Relationship(back_populates=None, cascade_delete=True)  # one-way relationship
    jobs: list["Jobs"] = Relationship(back_populates="skus", link_model=JobParts)  # many-to-many relationship

class SkuCreate(SkuBase):
    pass

class SkuRead(SkuBase):
    id: uuid.UUID

class SkuUpdate(SkuBase):
    sku_value: Optional[str] = None
    size: Optional[sizeEnum] = None
    description: Optional[str] = None

Sku.model_rebuild()
