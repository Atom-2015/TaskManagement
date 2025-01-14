// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPencil } from '@fortawesome/free-solid-svg-icons';

// function Projectdetal() {
//   const projectDetails = {
//     projectName: 'Project ABC',
//     projectLead: 'John Doe',
//     projectCost: '$10,000',
//     clientName: 'Client XYZ',
//     clientLogo: 'logo.png',
//     location: 'New York',
//     kmlFile: 'project.kml',
//     workOrderFile: 'workorder.pdf',
//     deadline: '2025-12-31',
//     companyName: 'XYZ Corp',
//     companyEmail: 'contact@xyzcorp.com',
//     companyPhone: '+1234567890',
//     leadEmail: 'john.doe@xyzcorp.com',
//     leadPhone: '+0987654321',
//   };

//   return (
//     <div className="bg-slate-400 p-8 flex flex-col gap-8">
//       {/* Project Company Details */}
//       <div className="bg-white rounded-lg shadow-lg p-6 w-full">
//         <div className="flex justify-between items-center mb-4 border-b ">
//           <h2 className="text-xl font-bold text-left  ">Project Company Details</h2>
//           <FontAwesomeIcon icon={faPencil} className="text-gray-500 cursor-pointer" />
//         </div>
//         <div className="grid grid-cols-4 gap-4">
//           <div>
//             <span className="block text-gray-600 font-semibold">Company Name</span>
//             <span className="text-gray-800">Enter company name</span>
//           </div>
//           <div>
//             <span className="block text-gray-600 font-semibold">Email</span>
//             <span className="text-gray-800">Enter email</span>
//           </div>
//           <div>
//             <span className="block text-gray-600 font-semibold">Phone Number</span>
//             <span className="text-gray-800">Enter phone number</span>
//           </div>
//         </div>
//       </div>

//       {/* Project Overview */}
//       <div className="bg-white rounded-lg shadow-lg p-6 w-full">
//         <div className="flex justify-between items-center mb-4 border-b">
//           <h2 className="text-xl font-bold text-left">Project Overview</h2>
//           <FontAwesomeIcon icon={faPencil} className="text-gray-500 cursor-pointer" />
//         </div>
//         <div className="grid grid-cols-4 gap-4">
//           <div>
//             <span className="block text-gray-600 font-semibold">Project Name</span>
//             <span className="text-gray-800">Enter project name</span>
//           </div>
//           <div>
//             <span className="block text-gray-600 font-semibold">Project Lead</span>
//             <span className="text-gray-800">Enter project lead</span>
//           </div>
//           <div>
//             <span className="block text-gray-600 font-semibold">Deadline</span>
//             <span className="text-gray-800">Enter deadline</span>
//           </div>
//         </div>
//       </div>

//       {/* Cost Estimations */}
//       <div className="bg-white rounded-lg shadow-lg p-6 w-full">
//         <div className="flex justify-between items-center mb-4 border-b">
//           <h2 className="text-xl font-bold text-left">Cost Estimations</h2>
//           <FontAwesomeIcon icon={faPencil} className="text-gray-500 cursor-pointer" />
//         </div>
//         <div className="grid grid-cols-4 gap-4">
//           <div>
//             <span className="block text-gray-600 font-semibold">Project Cost</span>
//             <span className="text-gray-800">Enter project cost</span>
//           </div>
//         </div>
//       </div>

//       {/* Aligned People */}
//       <div className="bg-white rounded-lg shadow-lg p-6 w-full">
//         <div className="flex justify-between items-center mb-4 border-b">
//           <h2 className="text-xl font-bold text-left">Aligned People</h2>
//           <FontAwesomeIcon icon={faPencil} className="text-gray-500 cursor-pointer" />
//         </div>
//         <div className="grid grid-cols-4 gap-3">
//           <div>
//             <span className="block text-gray-600 font-semibold">Lead Name</span>
//             <span className="text-gray-800">Enter lead name</span>
//           </div>
//           <div>
//             <span className="block text-gray-600 font-semibold">Email</span>
//             <span className="text-gray-800">Enter email</span>
//           </div>
//           <div>
//             <span className="block text-gray-600 font-semibold">Contact</span>
//             <span className="text-gray-800">Enter contact</span>
//           </div>
//         </div>
//       </div>

//       {/* Additional Information */}
//       <div className="bg-white rounded-lg shadow-lg p-6 w-full">
//         <div className="flex justify-between items-center mb-4 border-b">
//           <h2 className="text-xl font-bold text-left">Additional Information</h2>
//           <FontAwesomeIcon icon={faPencil} className="text-gray-500 cursor-pointer" />
//         </div>
//         <div className="grid grid-cols-4 gap-4">
//           <div>
//             <span className="block text-gray-600 font-semibold">Client Name</span>
//             <span className="text-gray-800">Enter client name</span>
//           </div>
//           <div>
//             <span className="block text-gray-600 font-semibold">Client Logo</span>
//             <span className="text-gray-800">Enter client logo</span>
//           </div>
//           <div>
//             <span className="block text-gray-600 font-semibold">Location</span>
//             <span className="text-gray-800">Enter location</span>
//           </div>
//           <div>
//             <span className="block text-gray-600 font-semibold">Upload KML</span>
//             <span className="text-gray-800">Enter upload KML</span>
//           </div>
//           <div>
//             <span className="block text-gray-600 font-semibold">Upload Work Order</span>
//             <span className="text-gray-800">Enter upload work order</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Projectdetal;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';  // Import eye icon

function ProjectDetail() {
  return (
    <div className="bg-white p-8 flex flex-col gap-8 rounded-xl">
      {/* Project Company Details */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-full border border-[#808080]">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-xl font-bold">Project Company Details</h2>
          <FontAwesomeIcon icon={faPencil} className="text-gray-500 cursor-pointer" />
        </div>
        <div className="grid grid-cols-4 gap-3 ml-2">
          <div>
            <label className="block text-gray-600 font-semibold text-left ">Company Name</label>
            <div className="bg-gray-100 border rounded-md p-2 text-left  ">XYZ Corp</div>
          </div>
          <div>
            <label className="block text-gray-600 font-semibold  text-left">Email</label>
            <div className="bg-gray-100 border rounded-md p-2 text-left">contact@xyzcorp.com</div>
          </div>
          <div>
            <label className="block text-gray-600 font-semibold text-left">Phone Number</label>
            <div className="bg-gray-100 border rounded-md p-2 text-left">+1234567890</div>
          </div>
        </div>
      </div>

      {/* Project Overview */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-full">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-xl font-bold">Project Overview</h2>
          <FontAwesomeIcon icon={faPencil} className="text-gray-500 cursor-pointer" />
        </div>
        <div className="grid grid-cols-4 gap-3 ml-2">
          <div>
            <label className="block text-gray-600 font-semibold text-left">Project Name</label>
            <div className="bg-gray-100 border rounded-md p-2 text-left">Project ABC</div>
          </div>
          <div>
            <label className="block text-gray-600 font-semibold text-left">Project Lead</label>
            <div className="bg-gray-100 border rounded-md p-2 text-left">John Doe</div>
          </div>
          <div>
            <label className="block text-gray-600 font-semibold text-left">Deadline</label>
            <div className="bg-gray-100 border rounded-md p-2 text-left">2025-12-31</div>
          </div>
        </div>
      </div>

      {/* Cost Estimations */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-full">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-xl font-bold">Cost Estimations</h2>
          <FontAwesomeIcon icon={faPencil} className="text-gray-500 cursor-pointer" />
        </div>
        <div className="grid grid-cols-4 gap-3 ml-2">
          <div>
            <label className="block text-gray-600 font-semibold text-left">Project Cost</label>
            <div className="bg-gray-100 border rounded-md p-2 text-left">$10,000</div>
          </div>
        </div>
      </div>

      {/* Aligned People */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-full">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-xl font-bold">Aligned People</h2>
          <FontAwesomeIcon icon={faPencil} className="text-gray-500 cursor-pointer" />
        </div>
        <div className="grid grid-cols-4 gap-3 ml-2">
          <div>
            <label className="block text-gray-600 font-semibold text-left">Lead Name</label>
            <div className="bg-gray-100 border rounded-md p-2 text-left">John Doe</div>
          </div>
          <div>
            <label className="block text-gray-600 font-semibold text-left">Lead Email</label>
            <div className="bg-gray-100 border rounded-md p-2 text-left">john.doe@xyzcorp.com</div>
          </div>
          <div>
            <label className="block text-gray-600 font-semibold text-left">Lead Phone</label>
            <div className="bg-gray-100 border rounded-md p-2 text-left">+0987654321</div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-full">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-xl font-bold">Additional Information</h2>
          <FontAwesomeIcon icon={faPencil} className="text-gray-500 cursor-pointer" />
        </div>
        <div className="grid grid-cols-4 gap-3 ml-2">
          <div>
            <label className="block text-gray-600 font-semibold text-left">Client Name</label>
            <div className="bg-gray-100 border rounded-md p-2 text-left">Client XYZ</div>
          </div>
          <div>
            <label className="block text-gray-600 font-semibold text-left">Client Logo</label>
            <div className="bg-gray-100 border rounded-md p-2 text-left">logo.png</div>
          </div>
          <div>
            <label className="block text-gray-600 font-semibold text-left">Location</label>
            <div className="bg-gray-100 border rounded-md p-2 text-left">New York</div>
          </div>
          <div>
            <label className="block text-gray-600 font-semibold text-left">KML File</label>
            <div className="flex justify-between items-center bg-gray-100 border rounded-md p-2">
              <span>project.kml</span>
              <FontAwesomeIcon icon={faEye} className="text-gray-500 cursor-pointer" />
            </div>
          </div>
          <div>
            <label className="block text-gray-600 font-semibold text-left">Work Order</label>
            <div className="flex justify-between items-center bg-gray-100 border rounded-md p-2">
              <span>workorder.pdf</span>
              <FontAwesomeIcon icon={faEye} className="text-gray-500 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;

