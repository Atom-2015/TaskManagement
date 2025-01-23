import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";

function ProjectDetail() {
  const [openSections, setOpenSections] = useState({
    companyDetails: true,
    projectOverview: true,
    costEstimation: true,
    alignedPeople: true,
    additionalInfo: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="bg-white p-8 flex flex-col gap-4 rounded-xl">
      
      {/* Project Company Details */}
      <div className="bg-white rounded-lg shadow-lg p-4 w-full border border-[#808080]">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("companyDetails")}>
          <h2 className="text-xl font-bold">Project Company Details</h2>
          <div className="flex gap-2">
        
            <FontAwesomeIcon icon={openSections.companyDetails ? faChevronUp : faChevronDown} className="text-gray-500" />
          </div>
        </div>
        {openSections.companyDetails && (
          <div className="grid grid-cols-4 gap-3 mt-3 ml-2">
            <div>
              <label className="block text-gray-600 font-semibold">Company Name</label>
              <input type="text" className="w-full bg-gray-100 border rounded-md p-2" placeholder="XYZ Corp" />
            </div>
            <div>
              <label className="block text-gray-600 font-semibold">Email</label>
              <input type="email" className="w-full bg-gray-100 border rounded-md p-2" placeholder="contact@xyzcorp.com" />
            </div>
            <div>
              <label className="block text-gray-600 font-semibold">Phone Number</label>
              <input type="text" className="w-full bg-gray-100 border rounded-md p-2" placeholder="+1234567890" />
            </div>
            <div>
              <label className="block text-gray-600 font-semibold">Work Order Upload</label>
              <input type="file" className="w-full bg-gray-100 border rounded-md p-2" />
            </div>
          </div>
        )}
      </div>

      {/* Project Overview */}
      <div className="bg-white rounded-lg shadow-lg p-4 w-full">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("projectOverview")}>
          <h2 className="text-xl font-bold">Project Overview</h2>
          <FontAwesomeIcon icon={openSections.projectOverview ? faChevronUp : faChevronDown} className="text-gray-500" />
        </div>
        {openSections.projectOverview && (
          <div className="grid grid-cols-4 gap-3 mt-3 ml-2">
            <div>
              <label className="block text-gray-600 font-semibold">Project Name</label>
              <input type="text" className="w-full bg-gray-100 border rounded-md p-2" placeholder="Project ABC" />
            </div>
            <div>
              <label className="block text-gray-600 font-semibold">Project Lead</label>
              <input type="text" className="w-full bg-gray-100 border rounded-md p-2" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-gray-600 font-semibold">Deadline</label>
              <input type="date" className="w-full bg-gray-100 border rounded-md p-2" />
            </div>
          </div>
        )}
      </div>

      {/* Cost Estimations */}
      <div className="bg-white rounded-lg shadow-lg p-4 w-full">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("costEstimation")}>
          <h2 className="text-xl font-bold">Cost Estimations</h2>
          <FontAwesomeIcon icon={openSections.costEstimation ? faChevronUp : faChevronDown} className="text-gray-500" />
        </div>
        {openSections.costEstimation && (
          <div className="grid grid-cols-4 gap-3 mt-3 ml-2">
            <div>
              <label className="block text-gray-600 font-semibold">Project Cost</label>
              <input type="text" className="w-full bg-gray-100 border rounded-md p-2" placeholder="$10,000" />
            </div>
          </div>
        )}
      </div>

      {/* Aligned People */}
      <div className="bg-white rounded-lg shadow-lg p-4 w-full">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("alignedPeople")}>
          <h2 className="text-xl font-bold">Aligned People</h2>
          <FontAwesomeIcon icon={openSections.alignedPeople ? faChevronUp : faChevronDown} className="text-gray-500" />
        </div>
        {openSections.alignedPeople && (
          <div className="grid grid-cols-4 gap-3 mt-3 ml-2">
            <div>
              <label className="block text-gray-600 font-semibold">Lead Name</label>
              <input type="text" className="w-full bg-gray-100 border rounded-md p-2" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-gray-600 font-semibold">Lead Email</label>
              <input type="email" className="w-full bg-gray-100 border rounded-md p-2" placeholder="john.doe@xyzcorp.com" />
            </div>
            <div>
              <label className="block text-gray-600 font-semibold">Lead Phone</label>
              <input type="text" className="w-full bg-gray-100 border rounded-md p-2" placeholder="+0987654321" />
            </div>
          </div>
        )}
      </div>

      {/* Additional Information */}
      <div className="bg-white rounded-lg shadow-lg p-4 w-full">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("additionalInfo")}>
          <h2 className="text-xl font-bold">Additional Information</h2>
          <FontAwesomeIcon icon={openSections.additionalInfo ? faChevronUp : faChevronDown} className="text-gray-500" />
        </div>
        {openSections.additionalInfo && (
          <div className="grid grid-cols-4 gap-3 mt-3 ml-2">
            <div>
              <label className="block text-gray-600 font-semibold">Client Name</label>
              <input type="text" className="w-full bg-gray-100 border rounded-md p-2" placeholder="Client XYZ" />
            </div>
            <div>
              <label className="block text-gray-600 font-semibold">Client Logo</label>
              <input type="file" className="w-full bg-gray-100 border rounded-md p-2" />
            </div>
            <div>
              <label className="block text-gray-600 font-semibold">Location</label>
              <input type="text" className="w-full bg-gray-100 border rounded-md p-2" placeholder="New York" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectDetail;
