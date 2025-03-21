// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPencil, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
// import { faEye } from "@fortawesome/free-regular-svg-icons";

// function ProjectDetail() {
//   const [openSections, setOpenSections] = useState({
//     companyDetails: true,
//     projectOverview: true,
//     costEstimation: true,
//     alignedPeople: true,
//     additionalInfo: true,
//   });

//   const toggleSection = (section) => {
//     setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
//   };

//   return (
//     <div className="bg-white p-8 flex flex-col gap-4 rounded-xl">

//       {/* Project Company Details */}
//       <div className="bg-white rounded-lg shadow-lg p-4 w-full border border-[#808080]">
//         <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("companyDetails")}>
//           <h2 className="text-xl font-bold">Project Company Details</h2>
//           <div className="flex gap-2">
//             {/* <FontAwesomeIcon icon={faPencil} className="text-gray-500" /> */}
//             <FontAwesomeIcon icon={openSections.companyDetails ? faChevronUp : faChevronDown} className="text-gray-500" />
//           </div>
//         </div>
//         {openSections.companyDetails && (
//           <div className="grid grid-cols-4 gap-3 mt-3 ml-2">
//             <div>
//               <label className="block text-gray-600 font-semibold">Company Name</label>
//               <input type="text" className="w-full bg-gray-100 border rounded-md p-2" placeholder="XYZ Corp" />
//             </div>
//             <div>
//               <label className="block text-gray-600 font-semibold">Email</label>
//               <input type="email" className="w-full bg-gray-100 border rounded-md p-2" placeholder="contact@xyzcorp.com" />
//             </div>
//             <div>
//               <label className="block text-gray-600 font-semibold">Phone Number</label>
//               <input type="text" className="w-full bg-gray-100 border rounded-md p-2" placeholder="+1234567890" />
//             </div>
//             <div>
//               <label className="block text-gray-600 font-semibold">Work Order Upload</label>
//               <input type="file" className="w-full bg-gray-100 border rounded-md p-2" />
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Project Overview */}
//       <div className="bg-white rounded-lg shadow-lg p-4 w-full">
//         <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("projectOverview")}>
//           <h2 className="text-xl font-bold">Project Overview</h2>
//           <FontAwesomeIcon icon={openSections.projectOverview ? faChevronUp : faChevronDown} className="text-gray-500" />
//         </div>
//         {openSections.projectOverview && (
//           <div className="grid grid-cols-4 gap-3 mt-3 ml-2">
//             <div>
//               <label className="block text-gray-600 font-semibold">Project Name</label>
//               <input type="text" className="w-full bg-gray-100 border rounded-md p-2" placeholder="Project ABC" />
//             </div>
//             <div>
//               <label className="block text-gray-600 font-semibold">Project Lead</label>
//               <input type="text" className="w-full bg-gray-100 border rounded-md p-2" placeholder="John Doe" />
//             </div>
//             <div>
//               <label className="block text-gray-600 font-semibold">Deadline</label>
//               <input type="date" className="w-full bg-gray-100 border rounded-md p-2" />
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Cost Estimations */}
//       <div className="bg-white rounded-lg shadow-lg p-4 w-full">
//         <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("costEstimation")}>
//           <h2 className="text-xl font-bold">Cost Estimations</h2>
//           <FontAwesomeIcon icon={openSections.costEstimation ? faChevronUp : faChevronDown} className="text-gray-500" />
//         </div>
//         {openSections.costEstimation && (
//           <div className="mt-3 ml-2">
//             {/* Table Structure  */}
//             <table className="w-full table-auto border-collapse">
//               <thead>
//                 <tr>
//                   <th className="p-2 border-b text-left">Sr. No.</th>
//                   <th className="p-2 border-b text-left">Type


//                     <option>In House</option>
//                     <option>Outsource</option>



//                   </th>
//                   <th className="p-2 border-b text-left">Activity</th>
//                   <th className="p-2 border-b text-left">Time</th>
//                   <th className="p-2 border-b text-left">Cost</th>
//                   <th className="p-2 border-b text-left">Remarks</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="p-2 border-b"><input type="text" className="w-full bg-gray-100 border rounded-md p-2" placeholder="1" /></td>
//                   <td className="p-2 border-b"><input type="text" className="w-full bg-gray-100 border rounded-md p-2" placeholder="Type" /></td>
//                   <td className="p-2 border-b"><input type="text" className="w-full bg-gray-100 border rounded-md p-2" placeholder="Activity" /></td>
//                   <td className="p-2 border-b"><input type="text" className="w-full bg-gray-100 border rounded-md p-2" placeholder="Total Time" /></td>
//                   <td className="p-2 border-b"><input type="text" className="w-full bg-gray-100 border rounded-md p-2" placeholder="Total Cost" /></td>
//                   <td className="p-2 border-b"><input type="text" className="w-full bg-gray-100 border rounded-md p-2" placeholder="Remarks" /></td>
//                 </tr>
//                 {/* Repeat the row below for more rows */}
//                 <tr>
//                   <td className="p-2 border-b"><input type="text" className="w-full bg-gray-100 border rounded-md p-2" placeholder="2" /></td>
//                   <td className="p-2 border-b"><input type="text" className="w-full bg-gray-100 border rounded-md p-2" placeholder="Type" /></td>
//                   <td className="p-2 border-b"><input type="text" className="w-full bg-gray-100 border rounded-md p-2" placeholder="Activity" /></td>
//                   <td className="p-2 border-b"><input type="text" className="w-full bg-gray-100 border rounded-md p-2" placeholder="Total Time" /></td>
//                   <td className="p-2 border-b"><input type="text" className="w-full bg-gray-100 border rounded-md p-2" placeholder="Total Cost" /></td>
//                   <td className="p-2 border-b"><input type="text" className="w-full bg-gray-100 border rounded-md p-2" placeholder="Remarks" /></td>
//                 </tr>
//                 {/* Repeat for 5 rows total */}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>


//       {/* Aligned People */}
//       <div className="bg-white rounded-lg shadow-lg p-4 w-full">
//         <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("alignedPeople")}>
//           <h2 className="text-xl font-bold">Aligned People</h2>
//           <FontAwesomeIcon icon={openSections.alignedPeople ? faChevronUp : faChevronDown} className="text-gray-500" />
//         </div>
//         {openSections.alignedPeople && (
//           <div className="grid grid-cols-4 gap-3 mt-3 ml-2">
//             <div>
//               <label className="block text-gray-600 font-semibold">Lead Name</label>
//               <input type="text" className="w-full bg-gray-100 border rounded-md p-2" placeholder="John Doe" />
//             </div>
//             <div>
//               <label className="block text-gray-600 font-semibold">Lead Email</label>
//               <input type="email" className="w-full bg-gray-100 border rounded-md p-2" placeholder="john.doe@xyzcorp.com" />
//             </div>
//             <div>
//               <label className="block text-gray-600 font-semibold">Lead Phone</label>
//               <input type="text" className="w-full bg-gray-100 border rounded-md p-2" placeholder="+0987654321" />
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Additional Information */}
//       <div className="bg-white rounded-lg shadow-lg p-4 w-full">
//         <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("additionalInfo")}>
//           <h2 className="text-xl font-bold">Additional Information</h2>
//           <FontAwesomeIcon icon={openSections.additionalInfo ? faChevronUp : faChevronDown} className="text-gray-500" />
//         </div>
//         {openSections.additionalInfo && (
//           <div className="grid grid-cols-4 gap-3 mt-3 ml-2">
//             <div>
//               <label className="block text-gray-600 font-semibold">Client Name</label>
//               <input type="text" className="w-full bg-gray-100 border rounded-md p-2" placeholder="Client XYZ" />
//             </div>
//             <div>
//               <label className="block text-gray-600 font-semibold">Client Logo</label>
//               <input type="file" className="w-full bg-gray-100 border rounded-md p-2" />
//             </div>
//             <div>
//               <label className="block text-gray-600 font-semibold">Location</label>
//               <input type="text" className="w-full bg-gray-100 border rounded-md p-2" placeholder="New York" />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ProjectDetail;



import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";

function ProjectDetail() {
  const [openSections, setOpenSections] = useState({
    companyDetails: true,
    projectOverview: true,
    costEstimation: true,
    alignedPeople: true,
    additionalInfo: true,
  });

  const [isActivityOpen, setIsActivityOpen] = useState({}); // To manage activity expansion state
  const [isProjectNameOpen, setIsProjectNameOpen] = useState({}); // To manage project name expansion state
  const [isModalOpen, setIsModalOpen] = useState(false); // To manage modal visibility
  const [modalData, setModalData] = useState({}); // To manage data in the modal
  const [tableData, setTableData] = useState(
    [1, 2, 3, 4, 5].map((index) => ({
      id: index,
      projectName: "",
      activity: "",
      time: "",
      cost: "",
      remarks: "",
    }))
  ); // To store the data of each row in the table

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleActivities = (row) => {
    setIsActivityOpen((prev) => ({
      ...prev,
      [row]: !prev[row],
    }));
  };

  const toggleProjectName = (row) => {
    setIsProjectNameOpen((prev) => ({
      ...prev,
      [row]: !prev[row],
    }));
  };

  const openModal = (row) => {
    setModalData(tableData.find((data) => data.id === row)); // Open the modal with current row's data
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const saveProjectName = () => {
    setTableData((prev) =>
      prev.map((data) =>
        data.id === modalData.id
          ? { ...data, projectName: modalData.projectName }
          : data
      )
    );
    closeModal();
  };

  const handleInputChange = (e, field) => {
    setModalData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleTableInputChange = (e, rowIndex, field) => {
    const updatedData = [...tableData];
    updatedData[rowIndex][field] = e.target.value;
    setTableData(updatedData);
  };

  const deleteRow = (rowIndex) => {
    setTableData(tableData.filter((_, index) => index !== rowIndex));
  };

  const addRow = () => {
    const newRow = {
      id: tableData.length + 1,
      projectName: "",
      activity: "",
      time: "",
      cost: "",
      remarks: "",
    };
    setTableData((prevData) => [...prevData, newRow]);
  };

  return (
    <div className="bg-white p-8 flex flex-col gap-4 rounded-xl">
      {/* Cost Estimations */}
      <div className="bg-white rounded-lg shadow-lg p-4 w-full">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("costEstimation")}>
          <h2 className="text-xl font-bold">Cost Estimations</h2>
          <FontAwesomeIcon icon={openSections.costEstimation ? faChevronUp : faChevronDown} className="text-gray-500" />
        </div>
        {openSections.costEstimation && (
          <div className="mt-3 ml-2">
            {/* Table Structure */}
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="p-2 border-b text-left">Sr. No.</th>
                  <th className="p-2 border-b text-left">Project Name</th>
                  <th className="p-2 border-b text-left">Type</th>
                  <th className="p-2 border-b text-left">Activity</th>
                  <th className="p-2 border-b text-left">Time</th>
                  <th className="p-2 border-b text-left">Cost</th>
                  <th className="p-2 border-b text-left">Remarks</th>
                  <th className="p-2 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((data, index) => (
                  <tr key={data.id}>
                    {/* Sr. No. */}
                    <td className="p-2 border-b text-left">
                      <input
                        type="text"
                        className="w-12 bg-gray-100 border rounded-md p-2 text-sm"
                        value={data.id}
                        readOnly
                      />
                    </td>

                    {/* Project Name with Expand Icon */}
                    <td className="p-2 border-b">
                      <div className="flex items-center">
                        <button onClick={() => openModal(data.id)}>
                          <FontAwesomeIcon icon={faChevronDown} className="text-gray-500" />
                        </button>
                        <span className="ml-2">{data.projectName || "Click to Edit"}</span>
                      </div>
                    </td>

                    {/* Type (Dropdown) */}
                    <td className="p-2 border-b text-left">
                      <select
                        className="w-24 bg-gray-100 border rounded-md p-2"
                        onChange={(e) => handleTableInputChange(e, index, "type")}
                        value={data.type || ""}
                      >
                        <option>In House</option>
                        <option>Outsource</option>
                      </select>
                    </td>

                    {/* Activity Section */}
                    <td className="p-2 border-b">
                      <div className="flex items-center">
                        <button onClick={() => toggleActivities(data.id)}>
                          <FontAwesomeIcon icon={isActivityOpen[data.id] ? faChevronUp : faChevronDown} className="text-gray-500" />
                        </button>
                        <span className="ml-2">Activity</span>
                      </div>
                      {isActivityOpen[data.id] && (
                        <div className="mt-2 ml-2">
                          <input
                            type="text"
                            className="w-full bg-gray-100 border rounded-md p-2 mb-2"
                            placeholder="Activity Detail"
                            value={data.activity}
                            onChange={(e) => handleTableInputChange(e, index, "activity")}
                          />
                        </div>
                      )}
                    </td>

                    {/* Time, Cost, and Remarks */}
                    <td className="p-2 border-b">
                      <input
                        type="text"
                        className="w-full bg-gray-100 border rounded-md p-2"
                        placeholder="Total Time"
                        value={data.time}
                        onChange={(e) => handleTableInputChange(e, index, "time")}
                      />
                    </td>
                    <td className="p-2 border-b">
                      <input
                        type="text"
                        className="w-full bg-gray-100 border rounded-md p-2"
                        placeholder="Total Cost"
                        value={data.cost}
                        onChange={(e) => handleTableInputChange(e, index, "cost")}
                      />
                    </td>
                    <td className="p-2 border-b">
                      <input
                        type="text"
                        className="w-full bg-gray-100 border rounded-md p-2"
                        placeholder="Remarks"
                        value={data.remarks}
                        onChange={(e) => handleTableInputChange(e, index, "remarks")}
                      />
                    </td>

                    

                    {/* Actions */}
                    <td className="p-2 border-b">
                      <button className="mr-2 text-blue-500">
                        <FontAwesomeIcon icon={faSave} />
                      </button>
                      <button className="text-red-500" onClick={() => deleteRow(index)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="flex justify-end mt-4">
          <button
            onClick={addRow}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Add Row
          </button>
        </div>
      </div>

      {/* Modal for Project Name Editing */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">Edit Project Name</h3>
            <input
              type="text"
              className="w-full bg-gray-100 border rounded-md p-2 mb-2"
              placeholder="Enter Project Name"
              value={modalData.projectName}
              onChange={(e) => handleInputChange(e, "projectName")}
            />
            <div className="flex justify-end gap-4">
              <button className="text-blue-500" onClick={saveProjectName}>
                Save
              </button>
              <button className="text-red-500" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectDetail;
