import React from 'react';

// Define the interface for the optimized order object
interface OptimizedOrder {
    customerName: string;
    id: string;
    description: string;
    expectedProfit: number;
}

interface OptimizedOrderRenderProps {
    optimized_next_order: OptimizedOrder;
}

const OptimizedOrderRender: React.FC<OptimizedOrderRenderProps> = ({ optimized_next_order }) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow">
            <div>
                <span>Customer: {optimized_next_order.customerName}</span>
                <br />
                <span>Order id: {optimized_next_order.id}</span>
                <br />
                <span>Order Description: {optimized_next_order.description}</span>
                <br />
                <span>Expected Profit: ${optimized_next_order.expectedProfit ? optimized_next_order.expectedProfit.toFixed(2) : '0.00'}</span>
            </div>
        </div>
    );
};

export default OptimizedOrderRender;
