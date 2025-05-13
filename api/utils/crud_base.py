from typing import Type, TypeVar, Generic, List, Optional
from sqlmodel import SQLModel, Session, select
from fastapi import HTTPException
from uuid import UUID
from datetime import datetime, timezone

ModelType = TypeVar("ModelType", bound=SQLModel)
CreateSchemaType = TypeVar("CreateSchemaType", bound=SQLModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=SQLModel)

class CRUDBase(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    def __init__(self, model: Type[ModelType]):
        self.model = model

    def get(self, db: Session, id: UUID, raise_not_found: bool = True) -> Optional[ModelType]:
        obj = db.get(self.model, id)
        if not obj and raise_not_found:
            raise HTTPException(status_code=404, detail=f"{self.model.__name__} not found")
        return obj

    def get_all(self, db: Session) -> List[ModelType]:
        return db.exec(select(self.model)).all()

    def create(self, db: Session, obj_in: CreateSchemaType) -> ModelType:
        try:
            obj = self.model(**obj_in.model_dump())
            db.add(obj)
            db.commit()
            db.refresh(obj)
            return obj
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Failed to create {self.model.__name__}: {str(e)}")

    def update(self, db: Session, db_obj: ModelType, obj_in: UpdateSchemaType) -> ModelType:
        update_data = obj_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_obj, field, value)
        if hasattr(db_obj, "updated_at"):
            setattr(db_obj, "updated_at", datetime.now(timezone.utc))
        try:
            db.add(db_obj)
            db.commit()
            db.refresh(db_obj)
            return db_obj
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Failed to update {self.model.__name__}: {str(e)}")

    def delete(self, db: Session, id: UUID, raise_not_found: bool = True) -> Optional[ModelType]:
        obj = self.get(db, id, raise_not_found=raise_not_found)
        if not obj:
            return None
        try:
            db.delete(obj)
            db.commit()
            return obj
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Failed to delete {self.model.__name__}: {str(e)}")
