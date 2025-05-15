import React, { useState, useEffect } from 'react';

enum JobType {
    directSale = "directSale",
    repair = "repair",
}

interface JobFormProps {
    onSubmit: (description: string, job_type: string, max_days: number, total_fixed_cost:number, total_profit:number) => void;
    loading: boolean;
    onCancel: () => void;
    }
const JobForm: React.FC<JobFormProps> = ({ onSubmit, loading, onCancel }) => {
    const [description, setDescription] = useState<string>('');
    const [job_type, setJobType] = useState<string>('repair'); // Default to empty string
    const [max_days, setMaxDays] = useState<number>(2); // Default to 2
    const [total_fixed_cost, setTotalFixedCost] = useState<number>(15); // Default to 15
    const [total_profit, setTotalProfit] = useState<number>(20); // Default to 20

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(description, job_type, max_days, total_fixed_cost, total_profit);
    };

    const handleJobTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setJobType(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mb-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Job Type</label>
                <select
                    id="job_type"
                    name="job_type"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={job_type}
                    onChange={handleJobTypeChange}
                    
                >
                    {Object.keys(JobType).map((key) => (
            <option key={key} value={JobType[key as keyof typeof JobType]}>
              {JobType[key as keyof typeof JobType]}
            </option>
          ))}
                        </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Max Days</label>
                <input
                    type="number"
                    value={max_days}
                    onChange={(e) => setMaxDays(Number(e.target.value))}
                    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Total Fixed Cost</label>
                <input
                    type="number"
                    value={total_fixed_cost}
                    onChange={(e) => setTotalFixedCost(Number(e.target.value))}
                    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Total Profit</label>
                <input
                    type="number"
                    value={total_profit}
                    onChange={(e) => setTotalProfit(Number(e.target.value))}
                    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                    required
                />
            </div>
            <div>
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
            </div>
        </form>
    );
};
    export default JobForm;