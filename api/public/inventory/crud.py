from api.utils.crud_base import CRUDBase
from api.public.inventory.models import *

crud_inventory = CRUDBase[Inventory, InventoryCreate, InventoryUpdate](Inventory)
