import React from "react";

function Userlist() {
  const users = [
    { name: "John Doe", email: "john.doe@example.com", role: "Admin", status: "Active" },
    { name: "Jane Smith", email: "jane.smith@example.com", role: "Editor", status: "Inactive" },
    { name: "Mike Johnson", email: "mike.johnson@example.com", role: "Viewer", status: "Pending" },
    { name: "Emily Davis", email: "emily.davis@example.com", role: "Admin", status: "Active" },
    { name: "Sophia Brown", email: "sophia.brown@example.com", role: "Editor", status: "Inactive" },
  ];

  // Function to return the appropriate border color based on user status
  const getStatusBorderColor = (status) => {
    switch (status) {
      case "Active":
        return "border-green-600";
      case "Inactive":
        return "border-gray-600";
      case "Pending":
        return "border-yellow-600";
      default:
        return "border-gray-300"; // Default color in case of an unknown status
    }
  };

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        {users.length !== 0 ? (
          users.map((user, index) => (
            <div key={index} className="mb-6 rounded">
              {/* User Info with dynamic left border color */}
              <div
                className={`bg-[#808080] rounded border-l-4 shadow-md ${getStatusBorderColor(
                  user.status
                )}`}
              >
                <div className="w-full text-left pl-2 text-white font-bold text-lg border-b border-gray-300">
                  {user.name}
                </div>

                {/* Table with user details */}
                <table className="table-fixed w-full text-left">
                  <thead>
                    <tr>
                      <th className="text-white px-2 py-0 w-1/4 border-r border-gray-300">Email</th>
                      <th className="text-white px-2 py-0 w-1/4 border-r border-gray-300">Role</th>
                      <th className="text-white px-2 py-0 w-1/4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-white px-2 py-0 border-r border-gray-300">{user.email}</td>
                      <td className="text-white px-2 py-0 border-r border-gray-300">{user.role}</td>
                      <td
                        className={`px-2 py-0 ${
                          user.status === "Active"
                            ? "text-green-600"
                            : user.status === "Inactive"
                            ? "text-gray-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {user.status}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-center text-gray-500">User list is empty</h1>
        )}
      </div>
    </div>
  );
}

export default Userlist;
