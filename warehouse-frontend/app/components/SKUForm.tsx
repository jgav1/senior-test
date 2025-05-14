// src/components/SKUForm.tsx
import React, { useState } from 'react';

interface SKUFormProps {
  onSubmit: (sku_value: string, description: string, size: string) => void;
  loading: boolean;
  onCancel: () => void;
}

const SKUForm: React.FC<SKUFormProps> = ({ onSubmit, loading, onCancel }) => {
  const [sku_value, setskuValue] = useState('');
  const [description, setDescription] = useState('');
  const [size, setSize] = useState('m');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(sku_value, description, size);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">SKU Value</label>
        <input
          type="text"
          placeholder="AAA-abc-12345-s-bl"
          value={sku_value}
          onChange={(e) => setskuValue(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <input
          type="text"
          placeholder="Generic Car Part"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Size</label>
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          required
        >
          <option value="xxs">XXS</option>
          <option value="xs">XS</option>
          <option value="s">S</option>
          <option value="m">M</option>
          <option value="l">L</option>
          <option value="xl">XL</option>
        </select>
      </div>
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

export default SKUForm;
