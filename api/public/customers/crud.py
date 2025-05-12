from fastapi import Depends
from sqlmodel import Session, text, select
from api.config import settings
from api.database import get_session
from api.public.customers.models import (
    Customer,
    CustomerCreate,)
from api.utils.logger import logger_config
from api.public.customers.exceptions import(
    CustomerAlreadyExists

)

logger = logger_config(__name__)

def crud_get_customers():
    return "Here are the mock customers"

def create_customer_crud(customer: CustomerCreate, db: Session = Depends(get_session)):
    try:
        customer_to_db = Customer(name=customer.name, last_name=customer.last_name, email=customer.email)
        db.add(customer_to_db)
        db.commit()
        db.refresh(customer_to_db)
        logger.info(f"Customer {customer_to_db.id} created successfully.")
        return customer_to_db
    except Exception as e:
        logger.error(f"Error creating customer: {e}")
        raise CustomerAlreadyExists(str(e))
