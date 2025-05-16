import React from 'react';

interface OptimizedOrder {
    customerName: string;
    id: string;
    description: string;
    expectedProfit: number;
}

interface OptimizedOrderRenderProps {
    optimized_next_order: OptimizedOrder | null;  // Allow it to be null
    onComplete: (orderId: string) => void;
}

const OptimizedOrderRender: React.FC<OptimizedOrderRenderProps> = ({ optimized_next_order, onComplete }) => {
    // Check if optimized_next_order exists and contains the necessary data
    if (!optimized_next_order || !optimized_next_order.id || !optimized_next_order.customerName || !optimized_next_order.description) {
        return <div>No optimized order available.</div>; // Return early if the data is missing
    }

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

            {/* Only show button if the optimized_next_order is valid */}
            <button 
                onClick={() => onComplete(optimized_next_order.id)} 
                className="mt-4 p-2 bg-blue-500 text-white rounded">
                Mark as Complete
            </button>
        </div>
    );
};

export default OptimizedOrderRender;
