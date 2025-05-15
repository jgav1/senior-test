import React from 'react';

interface OrderJobsRenderProps {
  orderJobStrings: string[]; // `orderJobStrings` is passed as a prop
  deleteWorkshopOrderJobs: (workshop_order_id: string, job_id: string) => void; // Function to handle deletion
}

const OrderJobsRender: React.FC<OrderJobsRenderProps> = ({ orderJobStrings, deleteWorkshopOrderJobs }) => {

  const handleSelect = (item: string) => {

    const regex = /Workshop description: ([^|]+) \| Job description: ([^|]+) \| WorkshopOrder id: ([a-f0-9\-]+) \| Job id: ([a-f0-9\-]+)/;
    const match = item.match(regex);

    if (match && match[3] && match[4]) {
      const workshopOrderId = match[3]; 
      const jobId = match[4]; 
      deleteWorkshopOrderJobs(workshopOrderId, jobId);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <div>
        <h2>Order Jobs List</h2>
        <ul>
          {orderJobStrings.map((item, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{item}</span>

              {/* Render delete button */}
              <button
                onClick={() => handleSelect(item)} // Trigger handleSelect when the button is clicked
                className="text-red-600 hover:text-red-800 ml-2"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderJobsRender;
