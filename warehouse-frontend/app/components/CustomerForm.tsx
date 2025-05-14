import React from 'react';
import BaseForm from './BaseForm';

interface CustomerFormProps {
  onSubmit: (email: string, last_name: string, name: string) => void;
  loading: boolean;
  onCancel: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onSubmit, loading, onCancel }) => {
  // Field labels for Customer form
  const fieldLabels = {
    email: 'Email',
    last_name: 'Last Name',
    name: 'Name',
  };

  // Placeholders for Customer form fields
  const placeholders = {
    email: 'example@example.com',
    last_name: 'Doe',
    name: 'John',
  };

  // Initial empty field values for Customer form
  const fields = {
    email: '',
    last_name: '',
    name: '',
  };

  // Handle the form submission
  const handleSubmit = (formFields: { [key: string]: string }) => {
    const { email, last_name, name } = formFields;
    onSubmit(email, last_name, name);
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

export default CustomerForm;
