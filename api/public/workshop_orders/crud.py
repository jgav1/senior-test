from api.utils.crud_base import CRUDBase
from api.public.workshop_orders.models import *
from api.public.order_jobs.crud import *

crud_workshop_orders = CRUDBase[WorkShopOrders, WorkShopOrdersCreate, WorkShopOrdersUpdate](WorkShopOrders)
crud_workshop_orders_jobs_catalog = OrderJobsCRUD(OrderJobs)