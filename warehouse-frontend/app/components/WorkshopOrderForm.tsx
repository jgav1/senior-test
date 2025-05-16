import React, { useState } from 'react';
import BaseForm from './BaseForm';

enum State {
    created = "created",
    in_progress = "in_progress",
    completed = "completed",
    cancelled = "cancelled"
}

interface WorkshopOrderFormProps {
  onSubmit: ({
    customer_order_id,
    description,
    max_days,
    state,
    total_fixed_cost,
    total_profit,
    total_variable_cost,
  }: {
    customer_order_id: string;
    description: string;
    max_days: string;
    state: string;
    total_fixed_cost: string;
    total_profit: string;
    total_variable_cost: string;
  }) => void;
  loading: boolean;
  onCancel: () => void;
  customerOrders: { id: string; description: string }[]; // List of customer orders
}

const WorkshopOrderForm: React.FC<WorkshopOrderFormProps> = ({
  onSubmit,
  loading,
  onCancel,
  customerOrders,
}) => {
  const [selectedCustomerOrder, setSelectedCustomerOrder] = useState<string>(""); // Initialize with an empty string

  const [description, setDescription] = useState('Maintainance');
  const [maxDays, setMaxDays] = useState('10');
  const [state, setState] = useState('created');
  const [totalFixedCost, setTotalFixedCost] = useState('0');
  const [totalProfit, setTotalProfit] = useState('0');
  const [totalVariableCost, setTotalVariableCost] = useState('0');


  const handleCustomerOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCustomerOrder(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleMaxDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxDays(e.target.value);
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  const handleTotalFixedCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotalFixedCost(e.target.value);
  };

  const handleTotalProfitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotalProfit(e.target.value);
  };

  const handleTotalVariableCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotalVariableCost(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCustomerOrder && description) {
      onSubmit({
        customer_order_id: selectedCustomerOrder,
        description,
        max_days: maxDays,
        state: state,
        total_fixed_cost: totalFixedCost,
        total_profit: totalProfit,
        total_variable_cost: totalVariableCost,
      });
    }
  };

  const isFormValid =
    selectedCustomerOrder && description && maxDays && state && totalFixedCost && totalProfit && totalVariableCost;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-4">
      <div>
        <label htmlFor="customerOrders" className="block text-sm font-medium text-gray-700">
          Customer Order
        </label>
        <select
          id="customerOrders"
          name="customerOrders"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={selectedCustomerOrder}
          onChange={handleCustomerOrderChange}
        >
          <option value="">Select a customer order</option>
          {customerOrders.map((order) => (
            <option key={order.id} value={order.id}>
              {order.id} - {order.description}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <input
          type="text"
          id="description"
          placeholder="Enter description of workshop order"
          name="description"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>

      <div>
        <label htmlFor="max_days" className="block text-sm font-medium text-gray-700">
          Max Days
        </label>
        <input
          type="number"
          id="max_days"
          placeholder="10"
          name="max_days"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={maxDays}
          onChange={handleMaxDaysChange}
        />
      </div>

      <div>
        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
          State
        </label>
        <select
          id="state"
          name="state"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={state}
          onChange={handleStateChange}
        >
          {Object.keys(State).map((key) => (
            <option key={key} value={State[key as keyof typeof State]}>
              {State[key as keyof typeof State]}
            </option>
          ))}
        </select>
      </div>

 

      <div>
      <button
        type="submit"
        disabled={!isFormValid}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Creating...' : 'Submit'}
      </button>

      <button
        type="button"
        onClick={onCancel}
        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
      >
        Cancel
      </button>
      </div>
    </form>
  );
};

export default WorkshopOrderForm;
