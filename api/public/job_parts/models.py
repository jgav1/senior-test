from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime, timezone
import uuid
from typing import Optional


class JobParts(SQLModel, table=True):
    sku_id: uuid.UUID | None = Field(default=None, foreign_key="sku.id", primary_key=True)
    jobs_id: uuid.UUID | None = Field(default=None, foreign_key="jobs.id", primary_key=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc), nullable=True)

class JobPartsCreate(SQLModel):
    sku_id: uuid.UUID 
    jobs_id: uuid.UUID
    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "sku_id": "123e4567-e89b-12d3-a456-426614174000",
                    "jobs_id": "123e4567-e89b-12d3-a456-426614174000",
                }
            ]
        }
    }

class JobPartsRead(SQLModel):
    sku_id: uuid.UUID
    jobs_id: uuid.UUID
    created_at: datetime
    updated_at: Optional[datetime] = None
    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "sku_id": "123e4567-e89b-12d3-a456-426614174000",
                    "jobs_id": "123e4567-e89b-12d3-a456-426614174000",
                    "created_at": "2023-10-01T12:00:00Z",
                    "updated_at": "2023-10-01T12:00:00Z",
                }
            ]
        }
    }




JobParts.model_rebuild()