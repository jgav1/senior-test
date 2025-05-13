from api.utils.crud_base import CRUDBase
from api.public.parts.models import *
from api.public.vehicle_parts_catalog.models import *
from api.public.vehicle_parts_catalog.crud import *

crud_parts = CRUDBase[Parts, PartsCreate, PartsUpdate](Parts)
crud_vehicle_parts_catalog = VehiclePartsCatalogCRUD(VehiclePartsLink)