// src/components/HeaderWithActions.tsx
import React from 'react';

interface HeaderWithActionsProps {
  title: string;
  onCreateClick: () => void;
  onCancelClick: () => void;
  deleteMode: boolean;
  onDeleteModeToggle: () => void;
  createButtonLabel: string;
  deleteButtonLabel: string;
}

const HeaderWithActions: React.FC<HeaderWithActionsProps> = ({
  title,
  onCreateClick,
  onCancelClick,
  deleteMode,
  onDeleteModeToggle,
  createButtonLabel,
  deleteButtonLabel,
}) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-lg font-semibold">{title}</h2>

      {/* Show Create Button or Cancel Button based on deleteMode */}
      {!deleteMode ? (
        <button
          onClick={onCreateClick}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {createButtonLabel}
        </button>
      ) : (
        <button
          onClick={onCancelClick}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Cancel
        </button>
      )}

      {/* Toggle Delete Mode Button */}
  
    </div>
  );
};

export default HeaderWithActions;
