import React from 'react';
import BaseForm from './BaseForm';

interface VehicleFormProps {
  onSubmit: (customer_id: string, license_plate: string, vehicle_type_id: string, vin: string) => void;
  loading: boolean;
  onCancel: () => void;
}

const VehicleForm: React.FC<VehicleFormProps> = ({ onSubmit, loading, onCancel }) => {
  const fieldLabels = {
    customer_id: 'Customer ID',
    license_plate: 'License Plate',
    vehicle_type_id: 'Vehicle Type ID',
    vin: 'VIN',
  };

  const placeholders = {
    customer_id: 'UUID of Customer',
    license_plate: 'ABC-1234',
    vehicle_type_id: 'UUID of Vehicle Type',
    vin: '1HGBH41JXMN109186',
  };

  const fields = {
    customer_id: '',
    license_plate: '',
    vehicle_type_id: '',
    vin: '',
  };

  const handleSubmit = (formFields: { [key: string]: string }) => {
    const { customer_id, license_plate, vehicle_type_id, vin } = formFields;
    onSubmit(customer_id, license_plate, vehicle_type_id, vin);
  };

  return (
    <BaseForm
      fields={fields}
      onSubmit={handleSubmit}
      loading={loading}
      onCancel={onCancel}
      fieldLabels={fieldLabels}
      placeholders={placeholders}
    />
  );
};

export default VehicleForm;
