
import httpx

base_url = "http://localhost:8000"  

async def calculate_total_revenue(order_id: str) -> float:
    async with httpx.AsyncClient() as client:  
        response = await client.get(f"{base_url}/workshop_orders/{order_id}/jobs")
    
        if response.status_code == 200:
            workshop_order_data = response.json()
            
            job_ids = [item['jobs_id'] for item in workshop_order_data]
            
            total_revenue = 0
            for job_id in job_ids:
                
                job_response = await client.get(f"{base_url}/jobs/{job_id}")
                if job_response.status_code == 200:
                    job_data = job_response.json()
                    total_revenue += float(job_data['total_profit'])
                else:
                    print(f"Failed to fetch job details for job_id: {job_id}")
            
            return total_revenue
        else:
            raise Exception(f"Error fetching workshop order jobs for {order_id}: {response.status_code}")
        
async def calculate_total_fixed_costs(order_id: str) -> float:
    async with httpx.AsyncClient() as client:  
        response = await client.get(f"{base_url}/workshop_orders/{order_id}/jobs")
    
        if response.status_code == 200:
            workshop_order_data = response.json()
            job_ids = [item['jobs_id'] for item in workshop_order_data]

            total_fixed_costs = 0
            for job_id in job_ids:
                
                job_response = await client.get(f"{base_url}/jobs/{job_id}")
                if job_response.status_code == 200:
                    job_data = job_response.json()
                    total_fixed_costs -= float(job_data['total_fixed_cost'])
                else:
                    print(f"Failed to fetch job details for job_id: {job_id}")

            return total_fixed_costs
        else:
            raise Exception(f"Error fetching workshop order jobs for {order_id}: {response.status_code}")
        
async def calculate_profit(order_id: str) -> float:
    
    total_revenue = await calculate_total_revenue(order_id)
    
    
    total_fixed_costs = await calculate_total_fixed_costs(order_id)
    
    
    profit = total_revenue + total_fixed_costs  
    
    return profit


async def calculate_combined_revenue() -> float:
    async with httpx.AsyncClient() as client:  
       
        response = await client.get(f"{base_url}/workshop_orders/")
        
        if response.status_code == 200:
            orders_data = response.json()
            
            
            combined_revenue = 0
            
           
            for order in orders_data:
                order_id = order['id']  
                
               
                order_revenue = await calculate_total_revenue(order_id)
                combined_revenue += order_revenue  
            
            return combined_revenue
        else:
            raise Exception(f"Error fetching workshop orders: {response.status_code}")


        

        

        

