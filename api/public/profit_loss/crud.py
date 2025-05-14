from api.utils.crud_base import CRUDBase
from api.public.profit_loss.models import *

crud_profit_loss = CRUDBase[ProfitLoss, ProfitLossCreate, ProfitLossUpdate](ProfitLoss)
