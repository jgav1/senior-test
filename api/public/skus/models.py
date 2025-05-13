from sqlmodel import Field, Relationship, SQLModel
from typing import Optional, List
from datetime import datetime, timezone
from enum import Enum
import uuid
from pydantic import field_validator

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
    

    @field_validator("sku_value","description", mode="before")
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
                    "description": "A small black t-shirt",
                }
            ]
        }
    }

class Sku(SkuBase, table=True):
    id: uuid.UUID | None = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc), nullable=True)

class SkuCreate(SkuBase):
    pass

class SkuRead(SkuBase):
    id: uuid.UUID
    sku_value: str
    size: sizeEnum
    description: str

class SkuUpdate(SkuBase):
    sku_value: Optional[str] = None
    size: Optional[sizeEnum] = None
    description: Optional[str] = None
    


   