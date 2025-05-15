import React, {useState} from 'react';
import BaseForm from './BaseForm';

interface WorkshopOrderFormProps {
    onSubmit: ({ customer_order_id: string, description: string, max_days: string, state: string, total_fixed_cost: string, total_profit: string, total_variable_cost: string }) => void;
    loading: boolean;
    onCancel: () => void;
    customerOrders: {id: string, description: string}[]; // List of customer orders
}

const WorkshopOrderForm: React.FC<WorkshopOrderFormProps> = ({
    onSubmit,
    loading,
    onCancel,
    customerOrders,
}) => {
    const [selectedCustomerOrder, setSelectedCustomerOrder] = useState<string | null>(null);
    const [description, setDescription] = useState('');

    const handleCustomerOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCustomerOrder(e.target.value);
    }
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedCustomerOrder && description) {
            onSubmit({
                customer_order_id: selectedCustomerOrder,
                description,
                max_days: '',
                state: '',
                total_fixed_cost: '',
                total_profit: '',
                total_variable_cost: ''
            });
        }
    };

    const isFormValid = selectedCustomerOrder && description;
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
                    name="description"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={description}
                    onChange={handleDescriptionChange}
                />
            </div>
            <div>
                <button
                    type="submit"
                    className={`mt-2 block w-full rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={!isFormValid || loading}
                >
                    {loading ? 'Creating...' : 'Create Workshop Order'}
                </button>
            </div>
        </form>
    )
};

export default WorkshopOrderForm;