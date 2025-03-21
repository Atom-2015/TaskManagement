import { useState } from "react";

const ProjectCost = () => {
  // Initial project data
  const [projectData, setProjectData] = useState({
    name: "Smart Inspection System",
    totalAmount: 5000000, // Total project budget
    totalSpent: 2000000, // Total amount spent
    users: [
      { id: 1, name: "Alice", amountGiven: 500000 },
      { id: 2, name: "Bob", amountGiven: 700000 },
      { id: 3, name: "Charlie", amountGiven: 800000 },
    ],
  });

  // Update total amount
  const handleTotalAmountChange = (e) => {
    setProjectData({ ...projectData, totalAmount: Number(e.target.value) });
  };

  // Update total spent amount
  const handleTotalSpentChange = (e) => {
    setProjectData({ ...projectData, totalSpent: Number(e.target.value) });
  };

  // Update amount given to each user
  const handleUserAmountChange = (id, amount) => {
    const updatedUsers = projectData.users.map((user) =>
      user.id === id ? { ...user, amountGiven: Number(amount) } : user
    );

    const newTotalSpent = updatedUsers.reduce((sum, user) => sum + user.amountGiven, 0);

    setProjectData({
      ...projectData,
      users: updatedUsers,
      totalSpent: newTotalSpent,
    });
  };

  // Add a new user
  const addUser = () => {
    const newUser = {
      id: projectData.users.length + 1,
      name: `User ${projectData.users.length + 1}`,
      amountGiven: 0,
    };
    setProjectData({ ...projectData, users: [...projectData.users, newUser] });
  };

  // Remove a user
  const removeUser = (id) => {
    const updatedUsers = projectData.users.filter((user) => user.id !== id);
    const newTotalSpent = updatedUsers.reduce((sum, user) => sum + user.amountGiven, 0);

    setProjectData({
      ...projectData,
      users: updatedUsers,
      totalSpent: newTotalSpent,
    });
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{projectData.name}</h2>

      {/* Editable Project Cost Overview */}
      {/* <table className="w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border p-3">Project Value (₹)</th>
            <th className="border p-3">Total Spent (₹)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-3">
              <input
                type="number"
                value={projectData.totalAmount}
                // onChange={handleTotalAmountChange}
                className="w-full p-2 border rounded"
              />
            </td>
            <td className="border p-3">
              <input
                type="number"
                value={projectData.totalSpent}
                // onChange={handleTotalSpentChange}
                className="w-full p-2 border rounded"
              />
            </td>
          </tr>
        </tbody> 
      </table> */}

      {/* Users Table */}
      <h3 className="text-lg font-semibold text-gray-700 mb-3">User-wise Expenditure</h3>
      {/* <table className="w-full border-collapse border border-gray-300 text-gray-700">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border p-3">User Name</th>
            <th className="border p-3">Amount Given (₹)</th>
            <th className="border p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {projectData.users.map((user) => (
            <tr key={user.id} className="bg-white hover:bg-gray-100 transition">
              <td className="border p-3">{user.name}</td>
              <td className="border p-3">
                <input
                  type="number"
                  value={user.amountGiven}
                  onChange={(e) => handleUserAmountChange(user.id, e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </td>
              <td className="border p-3 text-center">
                <button
                  onClick={() => removeUser(user.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

      {/* Add User Button */}
      {/* <div className="flex justify-center mt-6">
        <button
          onClick={addUser}
          className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600"
        >
          Add User
        </button>
      </div> */}
    </div>
  );
};

export default ProjectCost;
