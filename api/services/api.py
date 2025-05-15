from fastapi import APIRouter
from api.services.services import *

router = APIRouter()

@router.get("/order/{order_id}/revenue")
async def get_order_revenue(order_id: str):
    try:
        revenue = await calculate_total_revenue(order_id)
        return {"order_id": order_id, "total_revenue": revenue}
    except Exception as e:
        return {"error": str(e)}

@router.get("/order/{order_id}/fixed_costs")
async def get_order_fixed_costs(order_id: str):
    try:
        fixed_costs = await calculate_total_fixed_costs(order_id)
        return {"order_id": order_id, "total_fixed_costs": fixed_costs}
    except Exception as e:
        return {"error": str(e)}
@router.get("/order/{order_id}/total_profit")
async def get_order_total_profit(order_id: str):
    try:
        total_profit = await calculate_profit(order_id)
        return {"order_id": order_id, "total_profit": total_profit}
    except Exception as e:
        return {"error": str(e)}
@router.get("/total/revenue")
async def get_order_revenue():
    try:
        revenue = await calculate_combined_revenue()
        return {"total_revenue": revenue}
    except Exception as e:
        return {"error": str(e)}
    
