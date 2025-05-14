from api.utils.crud_base import CRUDBase
from api.public.jobs.models import *
from api.public.jobs.models import *
from api.public.order_jobs.crud import *
from api.public.job_parts.crud import *


crud_jobs = CRUDBase[Jobs, JobsCreate, JobsUpdate](Jobs)

crud_workshop_orders_jobs_catalog = OrderJobsCRUD(OrderJobs)
crud_sku_jobs_catalog = JobPartsCRUD(JobParts)