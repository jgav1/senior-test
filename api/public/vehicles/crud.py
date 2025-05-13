from api.utils.crud_base import CRUDBase
from api.public.vehicles.models import *

crud_vehicles = CRUDBase[Vehicle, VehicleCreate, VehicleUpdate](Vehicle)
