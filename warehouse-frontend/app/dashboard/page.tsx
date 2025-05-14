export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-sm text-gray-500">Next Order Optimized</h2>
        <p className="text-xl font-bold">Lucas Automotive</p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow">
        <div>
          <h2 className="text-sm text-gray-500">Revenue as of today</h2>
          <p className="text-2xl font-bold text-green-600">$1,200</p>
        </div>
        <div>
          <h2 className="text-sm text-gray-500">Estimated cost per day</h2>
          <p className="text-2xl font-bold text-red-600">$40</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-sm text-gray-500">Total Inventory</h2>
        <ul className="mt-2 text-sm">
          <li>
            Product Quantity: <strong>5,000</strong>
          </li>
          <li>
            Space Used: <strong>1,200 m²</strong>
          </li>
        </ul>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-sm text-gray-500">Rent Per month</h2>
        <p className="text-xl font-bold  text-red-500">$3,000</p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-sm text-gray-500">Total Workshop Orders</h2>
        <p className="mt-2 text-sm">
          In Progress: <strong>3</strong>
        </p>
        <p className="text-sm">
          Completed: <strong>12</strong>
        </p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-sm text-gray-500">Workshop parallel orders capacity</h2>
        <p className="text-xl font-bold">1</p>
      </div>
    </div>
  );
}
