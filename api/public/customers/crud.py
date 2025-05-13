from api.utils.crud_base import CRUDBase
from api.public.customers.models import *

crud_customer_type = CRUDBase[Customer, CustomerCreate, CustomerUpdate](Customer)
