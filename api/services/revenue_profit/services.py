
import httpx

base_url = "http://localhost:8000"  

async def calculate_total_revenue(order_id: str, use_state_check: bool = True) -> float:
    async with httpx.AsyncClient() as client:
        
        # Fetch the workshop order details
        order_response = await client.get(f"{base_url}/workshop_orders/{order_id}")
        
        if order_response.status_code == 200:
            order_data = order_response.json()
            order_state = order_data.get("state")
            
            # If we want to use the state check, proceed only if the state is "completed"
            if use_state_check and order_state != "completed":
                print(f"Order {order_id} is not completed. Skipping revenue calculation.")
                return 0  # Or you could return some default value like 0 if the state doesn't match
            
            # If state check is disabled or the order is completed, proceed with fetching job details
            jobs_response = await client.get(f"{base_url}/workshop_orders/{order_id}/jobs")
            
            if jobs_response.status_code == 200:
                workshop_order_data = jobs_response.json()
                
                total_revenue = 0
                for job in workshop_order_data:
                    job_id = job['jobs_id']
                    
                    # Fetch job details to get the profit
                    job_response = await client.get(f"{base_url}/jobs/{job_id}")
                    if job_response.status_code == 200:
                        job_data = job_response.json()
                        total_revenue += float(job_data['total_profit'])
                    else:
                        print(f"Failed to fetch job details for job_id: {job_id}")
                
                return total_revenue
            else:
                raise Exception(f"Error fetching jobs for workshop order {order_id}: {jobs_response.status_code}")
        else:
            raise Exception(f"Error fetching workshop order {order_id}: {order_response.status_code}")

        
async def calculate_total_fixed_costs(order_id: str, use_state_check: bool = True) -> float:
    async with httpx.AsyncClient() as client:
        # Fetch the workshop order details
        order_response = await client.get(f"{base_url}/workshop_orders/{order_id}")
        
        if order_response.status_code == 200:
            order_data = order_response.json()
            order_state = order_data.get("state")
            
            # If we want to use the state check, proceed only if the state is "completed"
            if use_state_check and order_state != "completed":
                print(f"Order {order_id} is not completed. Skipping fixed cost calculation.")
                return 0  # Or you can return any default value like 0 if the state doesn't match
            
            # If state check is disabled or the order is completed, proceed with fetching job details
            jobs_response = await client.get(f"{base_url}/workshop_orders/{order_id}/jobs")
            
            if jobs_response.status_code == 200:
                workshop_order_data = jobs_response.json()
                
                total_fixed_costs = 0
                for job in workshop_order_data:
                    job_id = job['jobs_id']
                    
                    # Fetch job details to get the fixed costs
                    job_response = await client.get(f"{base_url}/jobs/{job_id}")
                    if job_response.status_code == 200:
                        job_data = job_response.json()
                        total_fixed_costs -= float(job_data['total_fixed_cost'])  # Subtract fixed costs
                    else:
                        print(f"Failed to fetch job details for job_id: {job_id}")
                
                return total_fixed_costs
            else:
                raise Exception(f"Error fetching jobs for workshop order {order_id}: {jobs_response.status_code}")
        else:
            raise Exception(f"Error fetching workshop order {order_id}: {order_response.status_code}")
 

async def calculate_profit(order_id: str, use_state_check: bool = True) -> float:
    total_revenue = await calculate_total_revenue(order_id, use_state_check)
    total_fixed_costs = await calculate_total_fixed_costs(order_id, use_state_check)
    profit = total_revenue + total_fixed_costs
    return profit

async def calculate_combined_revenue(use_state_check: bool = True) -> float:
    async with httpx.AsyncClient() as client:  
        response = await client.get(f"{base_url}/workshop_orders/")

        if response.status_code == 200:
            orders_data = response.json()

            combined_revenue = 0
            for order in orders_data:
                order_id = order['id']  

                # Fetch the revenue for each order, respecting the state check
                order_revenue = await calculate_total_revenue(order_id, use_state_check)
                combined_revenue += order_revenue

            return combined_revenue
        else:
            raise Exception(f"Error fetching workshop orders: {response.status_code}")
async def calculate_combined_fixed_costs(use_state_check: bool = True) -> float:
    async with httpx.AsyncClient() as client:  
        response = await client.get(f"{base_url}/workshop_orders/")

        if response.status_code == 200:
            orders_data = response.json()

            combined_fixed_costs = 0
            for order in orders_data:
                order_id = order['id']

                # Fetch the fixed costs for each order, respecting the state check
                order_fixed_costs = await calculate_total_fixed_costs(order_id, use_state_check)
                combined_fixed_costs += order_fixed_costs  # Add the fixed costs to the combined total

            return combined_fixed_costs
        else:
            raise Exception(f"Error fetching workshop orders: {response.status_code}")

async def calculate_combined_profit(use_state_check: bool = True) -> float:
    async with httpx.AsyncClient() as client:  
        response = await client.get(f"{base_url}/workshop_orders/")

        if response.status_code == 200:
            orders_data = response.json()

            combined_profit = 0
            for order in orders_data:
                order_id = order['id']

                # Fetch the profit for each order, respecting the state check
                order_profit = await calculate_profit(order_id, use_state_check)
                combined_profit += order_profit  # Add the profit to the combined total

            return combined_profit
        else:
            raise Exception(f"Error fetching workshop orders: {response.status_code}")

async def calculate_optimized_order_by_expected_profit(use_state_check: bool = False) -> str:
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{base_url}/workshop_orders/")
        
        if response.status_code == 200:
            orders_data = response.json()
            
            max_profit = float('-inf')  
            best_order_id = None

            for order in orders_data:
                order_id = order['id']  
                
                if(order['state'] != "completed"):
                    order_profit = await calculate_profit(order_id, use_state_check)

                
                if order_profit > max_profit:
                    max_profit = order_profit
                    best_order_id = order_id  

            if best_order_id:
                return {"best_order_id": best_order_id, "expected_profit": max_profit}
            else:
                raise Exception("No orders found.")
        else:
            raise Exception(f"Error fetching workshop orders: {response.status_code}")
        
async def calculate_all_expected_profits(use_state_check: bool = False) -> dict:
    async with httpx.AsyncClient() as client:

        response = await client.get(f"{base_url}/workshop_orders/")
        
        if response.status_code == 200:
            orders_data = response.json()
            
            order_profits = {}

            for order in orders_data:
                order_id = order['id']  
                order_profit = await calculate_profit(order_id, use_state_check)
                order_profits[order_id] = order_profit

            return order_profits  
        else:
            raise Exception(f"Error fetching workshop orders: {response.status_code}")
        
async def calculate_order_count_by_state() -> dict:
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{base_url}/workshop_orders/")
        
        if response.status_code == 200:
            orders_data = response.json()
            
            in_progress_count = 0
            created_count = 0
            completed_count = 0

            for order in orders_data:
                order_state = order.get("state")  
                
                if order_state == "in_progress":
                    in_progress_count += 1
                elif order_state == "created":
                    created_count += 1
                elif order_state == "completed":
                    completed_count += 1
            

            return {
                "in_progress": in_progress_count,
                "created": created_count,
                "completed": completed_count
            }
        else:
            raise Exception(f"Error fetching workshop orders: {response.status_code}")


async def get_optimized_order() -> dict:
    async with httpx.AsyncClient() as client:
        try:
            optimized_order_response = await client.get(f"{base_url}/services/optimized_order_by_expected_profit")
            
            if optimized_order_response.status_code != 200:
                raise Exception("Failed to fetch optimized order")
            

            optimized_order_data = optimized_order_response.json()
            optimized_order_id = optimized_order_data['optimized_order']['best_order_id']
            expected_profit = optimized_order_data['optimized_order']['expected_profit']

        
            workshop_order_response = await client.get(f"{base_url}/workshop_orders/{optimized_order_id}")
            
            if workshop_order_response.status_code != 200:
                raise Exception(f"Failed to fetch workshop order {optimized_order_id}")
                
            workshop_order_data = workshop_order_response.json()
            order_description = workshop_order_data.get('description', 'No description available')
            customer_order_id = workshop_order_data.get('customer_order_id', None)
            
            if customer_order_id:
                customer_order_response = await client.get(f"{base_url}/customer_orders/{customer_order_id}")

                if customer_order_response.status_code != 200:
                    raise Exception(f"Failed to fetch customer details for customer_order_id {customer_order_id}")

                customer_order_data = customer_order_response.json()
                customer_id = customer_order_data.get('customer_id', None)
                
                if customer_id:
                    customer_response = await client.get(f"{base_url}/customers/{customer_id}")

                    if customer_response.status_code != 200:
                        raise Exception(f"Failed to fetch customer details for customer_id {customer_id}")

                    customer_data = customer_response.json()
                    customer_name = customer_data.get('name', 'No name available')
                    customer_last_name = customer_data.get('last_name', 'No last name available')


            else:
                customer_name = 'No customer information available'
                customer_last_name = 'No customer information available'

             

            
            optimized_next_order = {
                "customerName": customer_name + " " + customer_last_name,
                "id": optimized_order_id,
                "description": order_description,
                "expectedProfit": expected_profit
            }

            return optimized_next_order
        except Exception as e:
            print(f"Error fetching optimized order: {str(e)}")
            return {"error": str(e)}



