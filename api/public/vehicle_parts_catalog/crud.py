from api.public.vehicle_types.models import *
from sqlmodel import Session, select
from api.public.vehicle_parts_catalog.models import *

class VehiclePartsCatalogCRUD:
    def __init__(self, model):
        self.model = model

    def create(self, db: Session, link: VehiclePartsLinkCreate) -> VehiclePartsLink:
        db_obj = self.model(**link.model_dump())
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def delete(self, db: Session, vehicletype_id: uuid.UUID, part_id: uuid.UUID) -> bool:
        statement = select(self.model).where(
            self.model.vehicletype_id == vehicletype_id,
            self.model.part_id == part_id
        )
        link = db.exec(statement).first()
        if link:
            db.delete(link)
            db.commit()
            return True
        return False

    def get_parts_for_vehicle(self, db: Session, vehicletype_id: uuid.UUID):
        return db.exec(select(self.model).where(self.model.vehicletype_id == vehicletype_id)).all()
    def get_vehicle_types_for_part(self, db: Session, part_id: uuid.UUID):
        return db.exec(select(self.model).where(self.model.part_id == part_id)).all()

