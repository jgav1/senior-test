# app/routes/crud_router.py

from fastapi import APIRouter, Depends, HTTPException
from typing import Type, TypeVar, Any
from sqlmodel import SQLModel, Session
from api.database import get_session
from api.utils.crud_base import CRUDBase
from uuid import UUID

ModelType = TypeVar("ModelType", bound=SQLModel)
CreateSchemaType = TypeVar("CreateSchemaType", bound=SQLModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=SQLModel)
ReadSchemaType = TypeVar("ReadSchemaType", bound=SQLModel)

def get_crud_router(
    *,
    model: Type[ModelType],
    create_schema: Type[CreateSchemaType],
    update_schema: Type[UpdateSchemaType],
    read_schema: Type[ReadSchemaType],
    crud: CRUDBase
) -> APIRouter:
    router = APIRouter()

    @router.get("/", response_model=list[read_schema])
    def read_all(db: Session = Depends(get_session)):
        return crud.get_all(db)

    @router.get("/{item_id}", response_model=read_schema)
    def read_one(item_id: UUID, db: Session = Depends(get_session)):
        obj = crud.get(db, item_id)
        if not obj:
            raise HTTPException(status_code=404, detail="Not found")
        return obj

    @router.post("/", response_model=read_schema)
    def create(item: create_schema, db: Session = Depends(get_session)):
        return crud.create(db, item)

    @router.patch("/{item_id}", response_model=read_schema)
    def update(item_id: UUID, item: update_schema, db: Session = Depends(get_session)):
        db_obj = crud.get(db, item_id)
        if not db_obj:
            raise HTTPException(status_code=404, detail="Not found")
        return crud.update(db, db_obj, item)

    @router.delete("/{item_id}", response_model=read_schema)
    def delete(item_id: UUID, db: Session = Depends(get_session)):
        obj = crud.delete(db, item_id)
        if not obj:
            raise HTTPException(status_code=404, detail="Not found")
        return obj

    return router
