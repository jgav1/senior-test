from fastapi import APIRouter, Depends, status
from api.utils.logger import logger_config
from sqlmodel import Session
from api.database import get_session
from api.public.customers.models import(
    Customer,
    CustomerCreate)
from api.public.customers.crud import(
    crud_get_customers,
    create_customer_crud)





router = APIRouter()

logger = logger_config(__name__)

@router.get("/test")
async def get_customers():
    return {"test endpoint": "reachable!"}

@router.get("")
async def get_customers():
    return crud_get_customers()

@router.post("")
def create_a_customer(customer: CustomerCreate, db: Session = Depends(get_session)):
    return create_customer_crud(customer=customer, db=db)