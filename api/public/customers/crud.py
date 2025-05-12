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
from uuid import UUID

logger = logger_config(__name__)


def read_customers(db: Session = Depends(get_session)):
    try:
        statement = select(Customer)
        results = db.exec(statement)
        customers = results.all()
        if not customers:
            logger.error("No customers found.")
            return {"error": "No customers found"}
        return customers
    except Exception as e:
        logger.error(f"Error fetching customers: {e}")
        return {"error": str(e)}
    
def read_customer(customer_id: UUID, db: Session = Depends(get_session)):
    try:
        if customer_id:
            customer = db.get(Customer, customer_id)
            if not customer:
                logger.error(f"Customer with id {customer_id} not found.")
                return {"error": "Customer not found"}
            return customer
    except Exception as e:
        logger.error(f"Error fetching customers: {e}")

def post_customer(customer: CustomerCreate, db: Session = Depends(get_session)):
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
