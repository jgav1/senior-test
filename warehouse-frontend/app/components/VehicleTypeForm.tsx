import React from 'react';
import BaseForm from './BaseForm';

interface VehicleTypeFormProps {
  onSubmit: (color: string, company: string, model: string, version: string, year: string) => void;
  loading: boolean;
  onCancel: () => void;
}

const VehicleTypeForm: React.FC<VehicleTypeFormProps> = ({ onSubmit, loading, onCancel }) => {
  const fieldLabels = {
    color: 'Color',
    company: 'Company',
    model: 'Model',
    version: 'Version',
    year: 'Year',
  };

  const placeholders = {
    color: 'Red',
    company: 'Toyota',
    model: 'Corolla',
    version: 'Touring',
    year: '2025', // Placeholder for year
  };

  const fields = {
    color: '',
    company: '',
    model: '',
    version: '',
    year: '2025', // Year is treated as a string here
  };

  const handleSubmit = (formFields: { [key: string]: string }) => {
    const { color, company, model, version, year } = formFields;
    // Parsing year as a number before sending it to the API
    onSubmit(String(color), String(company), String(model), String(version), String(year));
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

export default VehicleTypeForm;
