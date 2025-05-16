'use client'

import { useEffect, useState } from 'react'
import RevenueCosts from '../components/RevenueCosts';
import { fetchTotalProfit, fetchOptimizedOrder } from '@/lib/services/api';
import {updateWorkshopOrders} from '@/lib/workshop_order/api';
import OptimizedOrderRender from '../components/OptimizedOrderRender';


export default function Dashboard() {
  const [totalProfit, settotalProfit] = useState(0);
  const [optimizedOrder, setOptimizedOrder] = useState({
    customerName: '',
    id: '',
    description: '',
    expectedProfit: 0,
  });


  const getProfit = async () => {
    const profit= await fetchTotalProfit();
    settotalProfit(profit.total_profit);
  };

  const getOptimizedOrder = async () => {
    const order = await fetchOptimizedOrder();
    setOptimizedOrder(order);
  };

  useEffect(() => {
    getProfit();
    getOptimizedOrder();
  }, []); 


    const handleComplete = async (workshop_order_id: string) => {
    try {
      const details = await updateWorkshopOrders(workshop_order_id,{state: 'completed'});  // Make sure this function exists
      getProfit();
      getOptimizedOrder();
    } catch (error) {
      console.error('Error completing workshop order:', error);
    }
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-sm text-gray-500">Next Order Optimized</h2>
        <OptimizedOrderRender optimized_next_order={optimizedOrder} onComplete={handleComplete} />
      </div>
      <RevenueCosts total_profit={totalProfit} totalCosts={-100} />
      

      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-sm text-gray-500">Total Inventory</h2>
        <ul className="mt-2 text-sm">
          <li>
            Product Quantity: <strong>5,000</strong>
          </li>
          <li>
            Space Used: <strong>1,200 m²</strong>
          </li>
        </ul>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-sm text-gray-500">Rent Per month</h2>
        <p className="text-xl font-bold  text-red-500">$3,000</p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-sm text-gray-500">Total Workshop Orders</h2>
        <p className="mt-2 text-sm">
          In Progress: <strong>3</strong>
        </p>
        <p className="text-sm">
          Completed: <strong>12</strong>
        </p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-sm text-gray-500">Workshop parallel orders capacity</h2>
        <p className="text-xl font-bold">1</p>
      </div>
    </div>
  );
}
