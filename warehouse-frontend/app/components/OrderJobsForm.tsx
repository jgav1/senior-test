import React, { useState, useEffect } from 'react';

interface OrderJobsFormProps {
    onSubmit: (workshop_order_id: string, job_id: string) => void;
    loading: boolean;
    onCancel: () => void;
    workshopOrders: { id: string, description: string }[]; // List of workshop orders
    jobs: { id: string, description: string }[]; // List of jobs
}

const OrderJobsForm: React.FC<OrderJobsFormProps> = ({ onSubmit, loading, onCancel, workshopOrders = [], jobs = [] }) => {
    const [workshopOrderId, setWorkshopOrderId] = useState<string>('');
    const [jobId, setJobId] = useState<string>('');
    const [selectWorkshopOrder, setSelectWorkshopOrder] = useState<string>('');
    const [selectJob, setSelectJob] = useState<string>('');

    const handleWorkshopOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectWorkshopOrder(e.target.value);
        setWorkshopOrderId(e.target.value);
    };

    const handleJobChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectJob(e.target.value);
        setJobId(e.target.value);
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(workshopOrderId, jobId);
    };

    const isFormValid = selectWorkshopOrder && selectJob;

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mb-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Workshop Order ID</label>
                <select  
                id="workshopOrders"
                name="workshopOrders"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={selectWorkshopOrder}
                onChange={handleWorkshopOrderChange}>
                    <option value="">Select a workshop order</option>
                    {workshopOrders.map((order) => (
                        <option key={order.id} value={order.id}>
                            {order.id} {order.description}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Job ID</label>
                <select
                    id="jobs"
                    name="jobs"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={selectJob}
                    onChange={handleJobChange}
                >
                    <option value="">Select a job</option>
                    {jobs.map((job) => (
                        <option key={job.id} value={job.id}>
                            {job.id} {job.description}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex justify-end">
                <button
                    type="button"
                    disabled={!isFormValid}
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