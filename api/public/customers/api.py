from fastapi import APIRouter, Depends, status
from api.utils.logger import logger_config
from sqlmodel import Session
from api.database import get_session
from uuid import UUID
from api.public.customers.models import *
from api.public.customers.crud import *





router = APIRouter()

logger = logger_config(__name__)

@router.get("/test")
async def get_customers():
    return {"test endpoint": "reachable!"}

@router.get("", response_model=list[CustomerRead])
async def get_all_customers(db: Session = Depends(get_session)):
    return read_customers(db=db)

@router.get("/{customer_id}", response_model=CustomerRead)
async def get_customers(customer_id:UUID, db: Session = Depends(get_session)):
    return read_customer(customer_id=customer_id, db=db)

@router.post("", response_model=CustomerRead)
def create_customer(customer: CustomerCreate, db: Session = Depends(get_session)):
    return post_customer(customer=customer, db=db)

@router.patch("/{customer_id}", response_model=CustomerRead)
def update_customer(customer_id:UUID, customer:CustomerUpdate, db: Session = Depends(get_session)):
    return patch_customer(customer_id=customer_id, customer=customer, db=db)

@router.delete("/{customer_id}")
def remove_customer(customer_id:UUID, db: Session = Depends(get_session)):
    return delete_customer(customer_id=customer_id, db=db)