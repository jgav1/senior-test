import React, { useState, useEffect } from 'react';

interface OrderJobsFormProps {
    onSubmit: (workshop_order_id: string, job_id: string) => void;
    loading: boolean;
    onCancel: () => void;
}

const OrderJobsForm: React.FC<OrderJobsFormProps> = ({ onSubmit, loading, onCancel }) => {  
    const [workshopOrderId, setWorkshopOrderId] = useState<string>('');
    const [jobId, setJobId] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(workshopOrderId, jobId);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mb-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Workshop Order ID</label>
                <input
                    type="text"
                    value={workshopOrderId}
                    onChange={(e) => setWorkshopOrderId(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Job ID</label>
                <input
                    type="text"
                    value={jobId}
                    onChange={(e) => setJobId(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                    required
                />
            </div>
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={onCancel}
                    className="mr-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                >
                    {loading ? 'Loading...' : 'Submit'}
                </button>
            </div>
        </form>
    );
}

export default OrderJobsForm;