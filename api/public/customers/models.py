from sqlmodel import Field, Relationship, SQLModel 
from typing import Optional, List
from datetime import datetime
from enum import Enum
import uuid




class CustomerBase(SQLModel):
    name: str = Field(max_length=100)
    last_name: str = Field(max_length=100)
    email: str = Field(max_length=100, unique=True)
    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "name": "John",
                    "last_name": "Doe",
                    "email": "example@example.com",
                }
            ]
        }
    }

class Customer(CustomerBase, table=True):
    id: uuid.UUID | None = Field(default_factory=uuid.uuid4, primary_key=True)

class CustomerCreate(CustomerBase):
    pass
   