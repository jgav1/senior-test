import React from 'react';

interface RevenueCostsProps {
    total_profit: number;
    totalCosts: number;
}

const RevenueCosts: React.FC<RevenueCostsProps> = ({ total_profit, totalCosts }) => {
    // Ensure total_profit and totalCosts are numbers, default to 0 if they are not
    const profit = isNaN(total_profit) ? 0 : total_profit;
    const costs = isNaN(totalCosts) ? 0 : totalCosts;

    return (
        <div className="bg-white p-6 rounded-2xl shadow">
            <div>
                <h2 className="text-sm text-gray-500">Profit as of today</h2>
                <p className="text-2xl font-bold text-green-600">
                    ${profit.toFixed(2)}
                </p>
            </div>

            <div>
                <h2 className="text-sm text-gray-500">Estimated cost per day</h2>
                <p className="text-2xl font-bold text-red-600">
                    ${costs.toFixed(2)}
                </p>
            </div>
        </div>
    );
};

export default RevenueCosts;
