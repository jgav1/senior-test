from api.utils.crud_base import CRUDBase
from api.public.skus.models import *

crud_vehicle_type = CRUDBase[Sku, SkuCreate, SkuUpdate](Sku)
