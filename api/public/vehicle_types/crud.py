from api.utils.crud_base import CRUDBase
from api.public.vehicle_types.models import *

crud_vehicle_types = CRUDBase[VehicleType, VehicleTypeCreate, VehicleTypeUpdate](VehicleType)
