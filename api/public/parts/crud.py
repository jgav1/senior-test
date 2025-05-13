from api.utils.crud_base import CRUDBase
from api.public.parts.models import *

crud_parts = CRUDBase[Parts, PartsCreate, PartsUpdate](Parts)
