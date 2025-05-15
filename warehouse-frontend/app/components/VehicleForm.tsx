import React, { useState, useEffect } from 'react';

interface VehicleFormProps {
  onSubmit: (customer_id: string, license_plate: string, vehicle_type_id: string, vin: string) => void;
  loading: boolean;
  onCancel: () => void;
  customers: { id: string; name: string; last_name: string }[];  // List of customers with their last name
  vehicleTypes: { id: string; model: string; color: string; version: string; year: string }[];  // List of vehicle types
}

const VehicleForm: React.FC<VehicleFormProps> = ({
  onSubmit,
  loading,
  onCancel,
  customers,
  vehicleTypes,
}) => {
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [selectedVehicleType, setSelectedVehicleType] = useState<string | null>(null);
  const [licensePlate, setLicensePlate] = useState('');
  const [vin, setVin] = useState('');

  // Find the full name of the selected customer
  const selectedCustomerName = selectedCustomer
    ? customers.find((customer) => customer.id === selectedCustomer)
    : null;

  // Find the selected vehicle type details
  const selectedVehicleTypeDetails = selectedVehicleType
    ? vehicleTypes.find((vehicleType) => vehicleType.id === selectedVehicleType)
    : null;

  const handleCustomerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCustomer(e.target.value);
  };

  const handleVehicleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVehicleType(e.target.value);
  };

  const handleLicensePlateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLicensePlate(e.target.value);
  };

  const handleVinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVin(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCustomer && selectedVehicleType) {
      onSubmit(
        selectedCustomer,
        licensePlate,
        selectedVehicleType,
        vin
      );
    }
  };

  const isFormValid = selectedCustomer && selectedVehicleType && licensePlate && vin;

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
              {customer.name} {customer.last_name} {/* Display full name */}
            </option>
          ))}
        </select>
      </div>

      {/* Display selected customer name if selected */}
      {selectedCustomer && selectedCustomerName && (
        <div className="text-sm text-gray-600 mt-2">
          <strong>Selected Customer:</strong> {selectedCustomerName.name} {selectedCustomerName.last_name}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Select Vehicle Type</label>
        <select
          value={selectedVehicleType || ''}
          onChange={handleVehicleTypeChange}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          required
        >
          <option value="">Select a Vehicle Type</option>
          {vehicleTypes.map((vehicleType) => (
            <option key={vehicleType.id} value={vehicleType.id}>
              {vehicleType.model} {vehicleType.color} {vehicleType.version} {vehicleType.year}
            </option>
          ))}
        </select>
      </div>

      {/* Display selected vehicle type details if selected */}
      {selectedVehicleType && selectedVehicleTypeDetails && (
        <div className="text-sm text-gray-600 mt-2">
          <strong>Selected Vehicle Type:</strong>
          <div>Color: {selectedVehicleTypeDetails.color}</div>
          <div>Model: {selectedVehicleTypeDetails.model}</div>
          <div>Version: {selectedVehicleTypeDetails.version}</div>
          <div>Year: {selectedVehicleTypeDetails.year}</div>
        </div>
      )}

      {selectedCustomer && selectedVehicleType ? (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">License Plate</label>
            <input
              type="text"
              value={licensePlate}
              onChange={handleLicensePlateChange}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              placeholder="ABC-1234"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">VIN</label>
            <input
              type="text"
              value={vin}
              onChange={handleVinChange}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              placeholder="1HGBH41JXMN109186"
              required
            />
          </div>
        </>
      ) : (
        <p className="text-red-600 text-sm mt-2">
          Please select a customer and a vehicle type to proceed.
        </p>
      )}

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
    </form>
  );
};

export default VehicleForm;
