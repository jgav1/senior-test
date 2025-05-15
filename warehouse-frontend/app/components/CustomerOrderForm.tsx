import React, { useState } from 'react';

interface CustomerOrderFormProps {
  onSubmit: (customer_id: string, description: string, vehicle_id: string) => void;
  loading: boolean;
  onCancel: () => void;
  customers: { id: string; name: string; last_name: string }[]; // List of customers
  vehicles: { id: string; vin: string; customer_id: string }[];  // List of vehicles
}

const CustomerOrderForm: React.FC<CustomerOrderFormProps> = ({
  onSubmit,
  loading,
  onCancel,
  customers,
  vehicles,
}) => {
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [description, setDescription] = useState('');

  const handleCustomerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCustomer(e.target.value);
    setSelectedVehicle(null); // Reset vehicle when customer is changed
  };

  const handleVehicleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVehicle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCustomer && selectedVehicle && description) {
      onSubmit(selectedCustomer, description, selectedVehicle);
    }
  };

  const isFormValid = selectedCustomer && selectedVehicle && description;

  // Filter vehicles based on the selected customer's ID
  const filteredVehicles = selectedCustomer
    ? vehicles.filter((vehicle) => vehicle.customer_id === selectedCustomer)
    : [];

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Select Customer</label>
        <select
          value={selectedCustomer || ''}
          onChange={handleCustomerChange}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          required
        >
          <option value="">Select a Customer</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name} {customer.last_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Select Vehicle</label>
        <select
          value={selectedVehicle || ''}
          onChange={handleVehicleChange}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          required
        >
          <option value="">Select a Vehicle</option>
          {filteredVehicles.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.vin}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Enter order description"
          required
        />
      </div>

      <button
        type="submit"
        disabled={!isFormValid || loading}
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
    </form>
  );
};

export default CustomerOrderForm;
