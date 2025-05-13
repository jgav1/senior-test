from api.utils.crud_base import CRUDBase
from api.public.vehicle_types.models import *
from api.public.vehicle_parts_catalog.models import *
from api.public.vehicle_parts_catalog.crud import *


crud_vehicle_types = CRUDBase[VehicleType, VehicleTypeCreate, VehicleTypeUpdate](VehicleType)

crud_vehicle_parts_catalog = VehiclePartsCatalogCRUD(VehiclePartsLink)