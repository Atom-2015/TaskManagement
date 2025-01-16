import React from "react";

function Userlist() {
  const users = [
    { name: "John Doe", email: "john.doe@example.com", role: "Admin", status: "Active" },
    { name: "Jane Smith", email: "jane.smith@example.com", role: "Editor", status: "Inactive" },
    { name: "Mike Johnson", email: "mike.johnson@example.com", role: "Viewer", status: "Pending" },
    { name: "Emily Davis", email: "emily.davis@example.com", role: "Admin", status: "Active" },
    { name: "Sophia Brown", email: "sophia.brown@example.com", role: "Editor", status: "Inactive" },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-300 text-green-700";
      case "Inactive":
        return "bg-gray-300 text-gray-700";
      case "Pending":
        return "bg-yellow-300 text-yellow-700";
      default:
        return "bg-gray-300 text-gray-700";
    }
  };

  return (
    <div className="p-6 bg-[#2e3e4e] min-h-screen">
      <h1 className="text-2xl font-semibold text-white  mb-6">User List</h1>
      <div className="space-y-6">
        {users.length > 0 ? (
          users.map((user, index) => (
            <div
              key={index}
              className="bg-[#354759] rounded-lg shadow-lg border-l-4 p-2 hover:shadow-xl transition-all"
            >
              <h2 className="text-xl font-semibold text-white mb-2">{user.name}</h2>
              <table className="w-full table-fixed text-sm">
                <thead>
                  <tr className="text-white border-b">
                    <th className="px-4 py-2 text-center">Email</th>
                    <th className="px-4 py-2 text-center">Role</th>
                    <th className="px-4 py-2 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 text-white">{user.email}</td>
                    <td className="px-4 py-2 text-white">{user.role}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                          user.status
                        )}`}
                      >
                        {user.status}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No users found.</div>
        )}
      </div>
    </div>
  );
}

export default Userlist;
