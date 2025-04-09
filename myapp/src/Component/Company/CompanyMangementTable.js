import React, { useState, useRef } from 'react';
import { Edit, Trash, Search } from 'lucide-react';
import CompanyAddForm from './CompanyAddForm';
import { IoAddCircleOutline } from "react-icons/io5";
import { AnimatePresence } from "framer-motion";

const CompanyTable = () => {
  const [companies, setCompanies] = useState([
    {
      _id: "1",
      company_name: "Tech Solutions Inc",
      Owner: "Ratan Sharma",
      company_email: "contact@techsolutions.com",
      company_joinDate: "2023-12-31",
      company_validity:"2027-12-31",
      cost:20000,
      permission_location: [
        {
          country: "India",
          state: "Maharashtra",
          cities: ["Mumbai"],
        },
      ],
    },
    {
      _id: "2",
      company_name: "Global Enterprises",
      Owner: "Kushagra Ankit",
      company_email: "info@globalent.com",
      company_joinDate: "2024-06-30",
      company_validity:"2026-12-31",
      cost:20000,
      permission_location: [
        {
          country: "India",
          state: "Delhi",
          cities: ["New Delhi"],
        },
      ],
    },
    {
      _id: "7",
      company_name: "Example LLC",
      Owner: "Example Owner",
      company_email: "info@example.com",
      company_joinDate: "2023-09-30",
      company_validity:"2029-12-31",
      cost:20000,
      permission_location: [
        {
          country: "Germany",
          state: "Bavaria",
          cities: ["Munich"],
        },
      ],
    },
    {
      _id: "8",
      company_name: "Test Solutions",
      Owner: "Tester",
      company_email: "test@testsolutions.com",
      company_joinDate: "2024-05-20",
      company_validity:"2028-1-31",
      cost:20000,
      permission_location: [
        {
          country: "France",
          state: "Île-de-France",
          cities: ["Paris"],
        },
      ],
    },
    {
      _id: "9",
      company_name: "Pagination Test",
      Owner: "Page User",
      company_email: "page@pagination.com",
      company_joinDate: "2023-12-15",
      company_validity:"2029-12-1",
      cost:20000,
      permission_location: [
        {
          country: "Japan",
          state: "Tokyo",
          cities: ["Tokyo"],
        },
      ],
    },
    {
      _id: "10",
      company_name: "Another Company",
      Owner: "Another Owner",
      company_email: "contact@another.com",
      company_joinDate: "2024-02-28",
      company_validity:"2026-12-12",
      cost:2000000,
      permission_location: [
        {
          country: "Brazil",
          state: "São Paulo",
          cities: ["São Paulo"],
        },
      ],
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [showOwnerSearch,setShowOwnerSearch]=useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const addButtonRef = useRef(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9); // Number of items per page

  const handleAddCompany = (newCompany) => {
    if (editingCompany) {
      setCompanies(
        companies.map((company) =>
          company._id === editingCompany._id
            ? { ...newCompany, _id: editingCompany._id }
            : company
        )
      );
    } else {
      setCompanies([{ ...newCompany, _id: Date.now().toString() }, ...companies]);
    }
    setShowForm(false);
    setEditingCompany(null);
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    setCompanies(companies.filter((company) => company._id !== id));
    if (companies.length % itemsPerPage === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  const calculateDuration=(start,end)=>{
    if(!start || !end){
      return " 0 days"
    };

    const startDate=new Date(start);
    const endDate=new Date(end);

    if(isNaN(startDate.getTime())){
      return "invalid start date";
    }
    if(isNaN(endDate.getTime())){
      return "invalid end date";
    }
    if(endDate < startDate){
      return "inavlid date range"
    }

    const diffTime=Math.abs(endDate-startDate);
    const diffDays=Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return `${diffDays} days`;
  }
    

  const handleEdit = (company) => {
    setEditingCompany(company);
    setShowForm(true);
  };

  const formatCost=(cost)=>{
    return cost.toLocaleString('en-IN')
  }

  // Filter companies based on search term
  const filteredCompanies = companies.filter(company =>
    company.company_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOwner=companies.filter(company=> company.Owner.toLowerCase().includes(showOwnerSearch.toLowerCase()));

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCompanies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-start text-blue-700 text-2xl">Company List</div>
        <div className="flex items-center space-x-2">
          {/* <button
            onClick={() => setShowSearch(!showSearch)}
            className="text-gray-200 hover:text-white transition-colors"
          >
            <Search size={20} />
          </button> */}
          <button
            ref={addButtonRef}
            onClick={() => {
              setEditingCompany(null);
              setShowForm(true);
            }}
            className="flex items-center px-1 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          >
            <IoAddCircleOutline
              size={35}
              className="transform transition-transform duration-500 hover:rotate-180"
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showForm && (
          <CompanyAddForm
            onClose={() => {
              setShowForm(false);
              setEditingCompany(null);
            }}
            onAddCompany={handleAddCompany}
            editingCompany={editingCompany}
            buttonRef={addButtonRef}
          />
        )}
      </AnimatePresence>

      <table className="w-full relative">
        <thead className="bg-gray-200 border-1">
          <tr className="border-1 border-gray-400">
            <th className="p-3 text-center text-gray-800 border-1 border-gray-400 relative">
            <div className="flex items-center justify-center gap-2">
                Company Name
                <button 
                  onClick={() => setShowSearch(!showSearch)}
                  className="text-gray-800 hover:text-red-800 transition-colors"
                >
                  <Search size={16} />
                </button>
                {showSearch && (
                  <div className="absolute top-0 text-gray-800 left-0 right-0 -mt-10 mx-auto w-full">
                    <input
                      type="text"
                      placeholder="Search companies..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full p-2 text-black rounded-md shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                      onBlur={() => setShowSearch(false)}
                    />
                  </div>
                )}
              </div>
            </th>
            <th className="p-3 text-center text-gray-800 border-1 border-gray-400 relative">
              <div className='flex items-center justify-center gap-2'>
              Client Name
                <button>
                  
                </button>
              </div>
            </th>
            <th className="p-3 text-center text-gray-800 border-1 border-gray-400">
              Email
            </th>
            <th className="p-3 text-center text-gray-800 border-1 border-gray-400">
              COI Date
            </th>

            <th className='p-3 text-center text-gray-800 border-1 border-gray-400'>
                Validity Date
            </th>

            
            <th className='p-3 text-center text-gray-800 border-1 border-gray-400'>
                Duration
            </th>

            <th className='p-3 text-center text-gray-800 border-1 border-gray-400'>
                Renew Cost
            </th>

            <th className="p-3 text-center text-gray-800 border-1 border-gray-400">
              Locations
            </th>
            <th className="p-3 text-center text-gray-800 border-1 border-gray-400">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((company) => (
              <tr
                key={company._id}
                className="border-1 border-gray-400 hover:bg-gray-200"
              >
                <td className="p-3 border-1 border-gray-400 text-gray-700">
                  {company.company_name}
                </td>
                <td className="p-3 border-1 border-gray-400 text-gray-700">
                  {company.Owner}
                </td>
                <td className="p-3 border-1 border-gray-400 text-gray-700">
                  {company.company_email}
                </td>
                <td className="p-3 border-1 border-gray-400 text-gray-700">
                  {company.company_joinDate}
                </td>
                <td className="p-3 border-1 border-gray-400 text-gray-700">
                  {company.company_validity}
                </td>
                <td className="p-3 border-1 border-gray-400 text-gray-700">
                  {calculateDuration(company.company_joinDate, company.company_validity)}
                </td>
                <td className="p-3 border-1 border-gray-400 text-gray-700">
                  {formatCost(company.cost)}
                </td>
                <td className="p-3 border-1 border-gray-400 text-gray-700">
                  {company.permission_location.map((location, idx) => (
                    <div key={idx} className="mb-1 last:mb-0">
                      <strong className="text-blue-300">{location.country}</strong> -{" "}
                      {location.state}:{" "}
                      <span className="text-red-800">
                        {location.cities.join(", ")}
                      </span>
                    </div>
                  ))}
                </td>
                <td className="p-3 flex justify-center space-x-2">
                  <button
                    onClick={() => handleEdit(company)}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(company._id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash size={16} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="text-center p-3 text-gray-300"
              >
                {searchTerm ? "No matching companies found" : "No companies available"}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination controls */}
      {filteredCompanies.length > itemsPerPage && (
        <div className="flex justify-center mt-4">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-l-md border border-gray-300 ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-3 py-1 border-t border-b border-gray-300 ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                {number}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-r-md border border-gray-300 ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default CompanyTable;