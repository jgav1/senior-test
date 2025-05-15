from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime, timezone
import uuid
from typing import Optional


class OrderJobs(SQLModel, table=True):
    workshop_orders_id: uuid.UUID | None = Field(default=None, foreign_key="workshoporders.id", primary_key=True)
    jobs_id: uuid.UUID | None = Field(default=None, foreign_key="jobs.id", primary_key=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc), nullable=True)

class OrderJobsCreate(SQLModel):
    workshop_orders_id: uuid.UUID 
    jobs_id: uuid.UUID
    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "workshop_orders_id": "123e4567-e89b-12d3-a456-426614174000",
                    "jobs_id": "123e4567-e89b-12d3-a456-426614174000",
                }
            ]
        }
    }

class OrderJobsRead(SQLModel):
    workshop_orders_id: uuid.UUID
    jobs_id: uuid.UUID
    created_at: datetime
    updated_at: Optional[datetime] = None
    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "workshop_orders_id": "123e4567-e89b-12d3-a456-426614174000",
                    "jobs_id": "123e4567-e89b-12d3-a456-426614174000",
                    "created_at": "2023-10-01T12:00:00Z",
                    "updated_at": "2023-10-01T12:00:00Z",
                }
            ]
        }
    }




OrderJobs.model_rebuild()