from api.public.vehicle_types.models import *
from sqlmodel import Session, select
from api.public.job_parts.models import *

class JobPartsCRUD:
    def __init__(self, model):
        self.model = model

    def create(self, db: Session, link: JobPartsCreate) -> JobParts:
        db_obj = self.model(**link.model_dump())
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def delete(self, db: Session, sku_id: uuid.UUID, jobs_id: uuid.UUID) -> bool:
        statement = select(self.model).where(
            self.model.sku_id == sku_id,
            self.model.jobs_id == jobs_id
        )
        link = db.exec(statement).first()
        if link:
            db.delete(link)
            db.commit()
            return True
        return False

    def get_jobs_for_sku(self, db: Session, sku_id: uuid.UUID):
        return db.exec(select(self.model).where(self.model.sku_id == sku_id)).all()
    def get_sku_jobs_catalog(self, db: Session, jobs_id: uuid.UUID):
        return db.exec(select(self.model).where(self.model.jobs_id == jobs_id)).all()

