import React, { useState, useRef } from 'react';
import { Edit, Trash, Search } from 'lucide-react';
import CompanyAddForm from './CompanyAddForm';
import { IoAddCircleOutline } from "react-icons/io5";
import { AnimatePresence } from "framer-motion";
import { useDispatch,useSelector } from 'react-redux';
import { editCompany } from '../../FeatureRedux/companySlice/editCompanyslice';
import { useEffect } from 'react';
import { getCompany } from '../../FeatureRedux/companySlice/getCompanyslice';
import { delCompany } from '../../FeatureRedux/companySlice/deleteCompanyslice';
import Swal from 'sweetalert2';



const CompanyTable = () => {
  const dispatch = useDispatch();
   useEffect(() => {
      dispatch(getCompany());
     
   }, [dispatch]);
  
 
   const { data1, isError, isLoading, errorMessage , isSuccess } = useSelector((state) => state.getCompany) || {};

 const [companies, setCompanies] = useState([]);
 useEffect(() => {
   if (data1) {
      
     setCompanies([...data1].reverse());
     
   }
 }, [isSuccess]);


 
  const { data } = useSelector((state) => state.editCompanyForm) || {};



  const [showForm, setShowForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [showOwnerSearch, setShowOwnerSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const addButtonRef = useRef(null);
  
  

  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  dispatch(editCompany());


  const handleAddCompany = (newCompany) => {
    if (editingCompany) {
      const updatedCompany = { ...newCompany, _id: editingCompany._id };
      
    
      dispatch(editCompany(updatedCompany));
  
      
      setCompanies(
        companies.map((company) =>
          company._id === editingCompany._id ? updatedCompany : company
        )
      );
    } else {
      const newCompanyWithId = { ...newCompany, _id: Date.now().toString() };
  
      // Ideally you should create a separate thunk like createCompany, but for now just update UI
      setCompanies([newCompanyWithId, ...companies]);
    }
  
    setShowForm(false);
    setEditingCompany(null);
    setCurrentPage(1);
  };
  

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(delCompany({ _id: id }))
          .then(() => {
            const updatedList = companies.filter((company) => company._id !== id);
            setCompanies(updatedList);
  
            if (updatedList.length % itemsPerPage === 0 && currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }
  
            Swal.fire({
              title: 'Deleted!',
              text: 'The company has been deleted.',
              icon: 'success',
              timer: 2000, // auto-close after 3 seconds
              showConfirmButton: false,
            });
          })
          .catch((err) => {
            console.error("Deletion failed:", err);
            Swal.fire({
              title: 'Error!',
              text: 'Something went wrong. Please try again.',
              icon: 'error',
              timer: 2000,
              showConfirmButton: false,
            });
          });
      }
    });
  };
  
  
  

  const calculateDuration = (start, end) => {
    if (!start || !end) return "0 days";

    const startDate = new Date(start);
    const endDate = new Date(end);

    if (isNaN(startDate.getTime())) return "invalid start date";
    if (isNaN(endDate.getTime())) return "invalid end date";
    if (endDate < startDate) return "invalid date range";

    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days`;
  };

  const handleEdit = (company) => {
    setEditingCompany(company);
    setShowForm(true);  // Show the form
  };

  const formatDate = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    if (isNaN(date)) return 'Invalid date';
    return date.toLocaleDateString('en-GB'); // Format: DD/MM/YYYY
  };
  

  const formatCost = (cost) => {
    return cost.toLocaleString('en-IN');
  };

  const filteredCompanies = companies?.filter(company =>
    company.company_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOwner = companies?.filter(company => 
    company.client_name.toLowerCase().includes(showOwnerSearch.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCompanies?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCompanies?.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-start text-blue-700 text-2xl">Company List</div>
        <div className="flex items-center space-x-2">
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
            <th className="p-3 text-center text-gray-800 border-1 border-gray-400">
              Client Name
            </th>
            <th className="p-3 text-center text-gray-800 border-1 border-gray-400">
              Email
            </th>
            <th className="p-3 text-center text-gray-800 border-1 border-gray-400">
              COI Date
            </th>
            <th className="p-3 text-center text-gray-800 border-1 border-gray-400">
              Validity Date
            </th>
            <th className="p-3 text-center text-gray-800 border-1 border-gray-400">
              Duration
            </th>
            <th className="p-3 text-center text-gray-800 border-1 border-gray-400">
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
          {currentItems && currentItems?.length > 0 ? (
            currentItems.map((company) => (
              <tr
                key={company._id}
                className="border-1 border-gray-400 hover:bg-gray-200"
              >
                <td className="p-3 border-1 border-gray-400 text-gray-700">
                  {company.company_name}
                </td>
                <td className="p-3 border-1 border-gray-400 text-gray-700">
                  {company.client_name}
                </td>
                <td className="p-3 border-1 border-gray-400 text-gray-700">
                  {company.email}
                </td>
                <td className="p-3 border-1 border-gray-400 text-gray-700">
                {formatDate(company.joinDate)}
                </td>
                <td className="p-3 border-1 border-gray-400 text-gray-700">
                {formatDate(company.validity)}
                </td>
                <td className="p-3 border-1 border-gray-400 text-gray-700">
                  {calculateDuration(company.joinDate, company.validity)}
                </td>
                <td className="p-3 border-1 border-gray-400 text-gray-700">
                ₹ {formatCost(company.cost)}
                </td>
                <td className="p-3 border-1 border-gray-400 text-gray-700">
  <strong className="text-blue-300">{company.country}</strong> -{" "}
  {company.state}:{" "}
  <span className="text-red-800">{company.city}</span>
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
              <td colSpan="9" className="text-center p-3 text-gray-300">
                {searchTerm ? "No matching companies found" : "No companies available"}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {filteredCompanies && filteredCompanies?.length > itemsPerPage && (
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