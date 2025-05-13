from api.utils.crud_base import CRUDBase
from api.public.part_market_data.models import *

crud_parts_market_data = CRUDBase[PartsMarketData, PartsMarketDataCreate, PartsMarketDataUpdate](PartsMarketData)
