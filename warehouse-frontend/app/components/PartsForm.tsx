import React, { useState, useEffect } from 'react';

interface PartFormProps {
  onSubmit: (quantity: number, sku_id: string) => void;
  loading: boolean;
  onCancel: () => void;
  availableSkus: { id: string; sku_value: string }[]; // List of available SKUs with ids
  initialValues?: { quantity: number; sku_id: string }; // Optional initial values for editing
}

const PartForm: React.FC<PartFormProps> = ({ onSubmit, loading, onCancel, availableSkus, initialValues }) => {
  const [quantity, setQuantity] = useState<number>(initialValues?.quantity || 1); // Default quantity is 1 or from initialValues
  const [skuId, setSkuId] = useState<string>(initialValues?.sku_id || (availableSkus[0]?.id || '')); // Default to first SKU or from initialValues

  // Update state if initialValues changes (e.g., when editing an existing part)
  useEffect(() => {
    if (initialValues) {
      setQuantity(initialValues.quantity);
      setSkuId(initialValues.sku_id);
    }
  }, [initialValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(quantity, skuId);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Select SKU</label>
        <select
          value={skuId}
          onChange={(e) => setSkuId(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          required
        >
          {availableSkus.map((sku) => (
            <option key={sku.id} value={sku.id}>
              {sku.sku_value}
            </option>
          ))}
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

export default PartForm;
