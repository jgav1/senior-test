// src/components/SKUForm.tsx
import React from 'react';
import BaseForm from './BaseForm';

interface SKUFormProps {
  onSubmit: (sku_value: string, description: string, size: string) => void;
  loading: boolean;
  onCancel: () => void;
}

const SKUForm: React.FC<SKUFormProps> = ({ onSubmit, loading, onCancel }) => {
  const fieldLabels = {
    sku_value: 'SKU Value',
    description: 'Description',
    size: 'Size',
  };

  const placeholders = {
    sku_value: 'AAA-abc-12345-s-bl',
    description: 'Generic Car Part',
    size: 'M', // Default placeholder for size
  };

  const fields = {
    sku_value: '',
    description: '',
    size: 'm',
  };

  const enumOptions = {
    size: ['xxs', 'xs', 's', 'm', 'l', 'xl'], // Enum options for size
  };

  const handleSubmit = (formFields: { [key: string]: string }) => {
    const { sku_value, description, size } = formFields;
    onSubmit(sku_value, description, size);
  };

  return (
    <BaseForm
      fields={fields}
      onSubmit={handleSubmit}
      loading={loading}
      onCancel={onCancel}
      fieldLabels={fieldLabels}
      placeholders={placeholders}
      enumOptions={enumOptions} // Pass enum options for size
    />
  );
};

export default SKUForm;
