// src/components/BaseForm.tsx
import React, { useState, FormEvent } from 'react';

interface BaseFormProps {
  fields: {
    [key: string]: string;
  };
  onSubmit: (fields: { [key: string]: string }) => void;
  loading: boolean;
  onCancel: () => void;
  fieldLabels: { [key: string]: string };
  placeholders: { [key: string]: string };
  enumOptions?: { [key: string]: string[] }; // Add enumOptions prop for enum-based fields
}

const BaseForm: React.FC<BaseFormProps> = ({
  fields,
  onSubmit,
  loading,
  onCancel,
  fieldLabels,
  placeholders,
  enumOptions = {}, // Default to empty object if not provided
}) => {
  const [formFields, setFormFields] = useState(fields);

  const handleFieldChange = (field: string, value: string) => {
    setFormFields((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formFields);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-4">
      {Object.keys(fieldLabels).map((field) => (
        <div key={field}>
          <label className="block text-sm font-medium text-gray-700">{fieldLabels[field]}</label>
          {enumOptions[field] ? (
            // Render a select input for enum fields
            <select
              value={formFields[field]}
              onChange={(e) => handleFieldChange(field, e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              required
            >
              {enumOptions[field].map((option) => (
                <option key={option} value={option}>
                  {option.toUpperCase()}
                </option>
              ))}
            </select>
          ) : (
            // Default to a text input for other fields
            <input
              type="text"
              value={formFields[field]}
              onChange={(e) => handleFieldChange(field, e.target.value)}
              placeholder={placeholders[field]}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        disabled={loading}
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

export default BaseForm;
