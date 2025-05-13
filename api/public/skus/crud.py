from api.utils.crud_base import CRUDBase
from api.public.skus.models import *

crud_sku_type = CRUDBase[Sku, SkuCreate, SkuUpdate](Sku)
