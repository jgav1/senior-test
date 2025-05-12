from fastapi import APIRouter, Depends
from api.public.customers import api as customers

#from api.auth import authent
#from api.public.health import views as health
#from api.public.hero import views as heroes
#from api.public.team import views as teams

api = APIRouter()

api.include_router(
    customers.router,
    prefix="/customers",
    tags=["Customers"],
    #dependencies=[Depends(authent)],
)

