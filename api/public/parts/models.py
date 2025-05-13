from sqlmodel import Field, Relationship, SQLModel
from typing import Optional, List
from datetime import datetime, timezone
from enum import Enum
import uuid
from pydantic import field_validator




class PartsBase(SQLModel):
    quantity: int = Field(nullable=False)    

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "quantity": "5",
                }
            ]
        }
    }

class Parts(PartsBase, table=True):
    id: uuid.UUID | None = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc), nullable=True)

class PartsCreate(PartsBase):
    pass

class PartsRead(PartsBase):
    id: uuid.UUID
    quantity: int
class PartsUpdate(PartsBase):
    quantity: Optional[int] = None
    


   