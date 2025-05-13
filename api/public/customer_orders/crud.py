from api.utils.crud_base import CRUDBase
from api.public.customer_orders.models import *

crud_customer_order = CRUDBase[CustomerOrder, CustomerOrderCreate, CustomerOrderUpdate](CustomerOrder)
