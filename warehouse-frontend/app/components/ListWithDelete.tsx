// src/components/ListWithDelete.tsx
import React, { useState } from 'react';

interface ListWithDeleteProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode; // Render function for each item
  deleteMode: boolean;
  onItemSelect: (itemId: string) => void; // Handler for selecting an item
  onDeleteItem: (itemId: string) => void; // Handler for deleting an item
}

const ListWithDelete = <T extends { id: string }>({
  items,
  renderItem,
  deleteMode,
  onItemSelect,
  onDeleteItem,
}: ListWithDeleteProps<T>) => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleSelect = (itemId: string) => {
    if (deleteMode) {
      setSelectedItemId(itemId); // Set the item as selected for deletion
      onItemSelect(itemId); // Call the handler with the selected item ID
    }
  };

  const handleDelete = (itemId: string) => {
    onDeleteItem(itemId); // Call the handler to delete the item
    setSelectedItemId(null); // Reset the selected item
  };

  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.id} className="border-b pb-2 flex justify-between items-center">
          <div>{renderItem(item)}</div>

          {deleteMode && (
            <button
              onClick={() => handleSelect(item.id)}
              className="text-red-600 hover:text-red-800"
            >
              ✖
            </button>
          )}
          {deleteMode && selectedItemId === item.id && (
            <button
              onClick={() => handleDelete(item.id)}
              className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
            >
              Confirm Delete
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ListWithDelete;
