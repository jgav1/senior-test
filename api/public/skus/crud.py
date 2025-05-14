from api.utils.crud_base import CRUDBase
from api.public.skus.models import *
from api.public.order_jobs.crud import *
from api.public.job_parts.crud import *

crud_sku_type = CRUDBase[Sku, SkuCreate, SkuUpdate](Sku)
crud_sku_jobs_catalog = JobPartsCRUD(JobParts)
