from fastapi import APIRouter, Depends, status

router = APIRouter()
#logger = logger_config(__name__)
@router.get("/")
async def get_customers():
    """
    Get all customers
    """
    return {"message": "Get all customers"}