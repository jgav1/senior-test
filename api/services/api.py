from fastapi import APIRouter
from api.services.revenue_profit.services import *
from pydantic import BaseModel

# Define response models with example data

router = APIRouter()

@router.get("/order/{order_id}/revenue")
async def get_order_revenue(order_id: str):
    try:
        revenue = await calculate_total_revenue(order_id, use_state_check=True)
        return {"order_id": order_id, "total_revenue": revenue}
    except Exception as e:
        return {"error": str(e)}

@router.get("/order/{order_id}/fixed_costs")
async def get_order_fixed_costs(order_id: str):
    try:
        fixed_costs = await calculate_total_fixed_costs(order_id, use_state_check=True)
        return {"order_id": order_id, "total_fixed_costs": fixed_costs}
    except Exception as e:
        return {"error": str(e)}

@router.get("/order/{order_id}/total_profit")
async def get_order_total_profit(order_id: str):
    try:
        total_profit = await calculate_profit(order_id, use_state_check=True)
        return {"order_id": order_id, "total_profit": total_profit}
    except Exception as e:
        return {"error": str(e)}

@router.get("/total/revenue")
async def get_total_revenue():
    try:
        revenue = await calculate_combined_revenue(use_state_check=True)
        return {"total_revenue": revenue}
    except Exception as e:
        return {"error": str(e)}

@router.get("/total/fixed_costs")
async def get_total_fixed_costs():
    try:
        fixed_costs = await calculate_combined_fixed_costs(use_state_check=True)
        return {"total_fixed_costs": fixed_costs}
    except Exception as e:
        return {"error": str(e)}

@router.get("/total/profit")
async def get_total_profit():
    try:
        total_profit = await calculate_combined_profit(use_state_check=True)
        return {"total_profit": total_profit}
    except Exception as e:
        return {"error": str(e)}

@router.get("/optimized_order_by_expected_profit")
async def get_optimized_order_by_expected_profit():
    try:
        optimized_order = await calculate_optimized_order_by_expected_profit(False)
        return {"optimized_order": optimized_order}
    except Exception as e:
        return {"error": str(e)}

@router.get("/all_order_profits")
async def get_all_expected_profits():
    try:
        profits = await calculate_all_expected_profits()
        return {"order_profits": profits}
    except Exception as e:
        return {"error": str(e)}

@router.get("/order_state_counts")
async def get_order_state_counts():
    try:
        state_counts = await calculate_order_count_by_state()
        return {"order_state_counts": state_counts}
    except Exception as e:
        return {"error": str(e)}
    
@router.get("/optimized/next_order")
async def get_optimized_next_order():
    try:
        optimized_order = await get_optimized_order()
        return optimized_order
    except Exception as e:
        return {"error": str(e)}