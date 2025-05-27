import React from 'react'

const DiscussionRevenue = ({ projectId,isRevOpen,setIsRevOpen}) => {


  return (
    <div className='flex items-center justify-center'>
        <div className='w-full bg-white rounded-xl shadow-md overflow-x-auto'>
            <table className='w-full text-sm text-gray-800'>
                <thead className='bg-blue-700 text-white text-[15px]'>
                    <tr>
                        <th className='p-2 text-center'>Date</th>
                        <th className='p-2 text-center'>Client Name</th>
                        <th className='p-2 text-center'>Discussed By</th>
                        <th className='p-2 text-center'>Phone No</th>
                        <th className='p-2 text-center'>Comment</th>
                        <th className='p-2 text-center'>Next Update</th>
                    </tr>

                </thead>
                <tbody>
                    <tr>
                        <td className="p-3 text-center">10-10-2010</td>
                        <td className="p-3 text-center">Sashi Tharoor</td>
                        <td className="p-3 text-center">Paid</td>
                    </tr>
                    <tr>
                        <td className="p-3 text-center">10-10-2010</td>
                        <td className="p-3 text-center">Sashi Tharoor</td>
                        <td className="p-3 text-center">Paid</td>
                    </tr>
                   
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default DiscussionRevenue






// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { addDiscussion } from "../../../FeatureRedux/DiscussionSlice/addDiscussionSlice";
// import { useSelector } from "react-redux";
// import { getDiscussion } from "../../../FeatureRedux/DiscussionSlice/getDiscussionSlice";
// import { editDiscussion } from "../../../FeatureRedux/DiscussionSlice/editDiscussionSlice";
// import Swal from 'sweetalert2';

// const DiscussionRevenue = ({ projectId, isRevOpen, setIsRevOpen }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editDiscussionId, setEditDiscussionId] = useState(null);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getDiscussion());
//   }, [dispatch]);

//   const getData = useSelector((state) => state.getDiscussion?.getData || []);

//   const filterData = getData?.filter(
//     (item) => item.projectId?.toString() === projectId?.toString()
//   );

//   const [formData, setFormData] = useState({
//     date: "",
//     clientName: "",
//     discussedBy: "",
//     phoneNo: "",
//     comment: "",
//     nextUpdate: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (isEditing && editDiscussionId) {
//         await dispatch(
//           editDiscussion({
//             discussionId: editDiscussionId,
//             updateData: { ...formData, projectId },
//           })
//         );
//         await dispatch(getDiscussion());
//         Swal.fire({
//           icon: 'success',
//           title: 'Discussion updated successfully!',
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       } else {
//         await dispatch(addDiscussion({ ...formData, projectId }));
//         await dispatch(getDiscussion());
//         Swal.fire({
//           icon: 'success',
//           title: 'Discussion added successfully!',
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       }

//       // Close modal and reset form
//       setIsRevOpen(false);
//       setFormData({
//         date: "",
//         clientName: "",
//         discussedBy: "",
//         phoneNo: "",
//         comment: "",
//         nextUpdate: "",
//       });
//     } catch (error) {
//       console.error("Error adding discussion:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Something went wrong!',
//         text: 'Please try again later.',
//       });
//     }
//   };

//   return (
//     <div className="flex items-center justify-center">
//       <div className="w-full bg-white rounded-xl shadow-md overflow-x-auto">
//         <table className="w-full text-sm text-gray-800">
//           <thead className="bg-blue-700 text-white text-[15px]">
//             <tr>
//               <th className="p-2 text-center">Date</th>
//               <th className="p-2 text-center">Client Name</th>
//               <th className="p-2 text-center">Discussed By</th>
//               <th className="p-2 text-center">Phone No</th>
//               <th className="p-2 text-center">Comment</th>
//               <th className="p-2 text-center">Next Update</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filterData.map((item) => (
//               <tr
//                 key={item._id}
//                 onClick={() => {
//                   setFormData({
//                     date: item.date.split("T")[0],
//                     clientName: item.clientName,
//                     discussedBy: item.discussedBy,
//                     phoneNo: item.phoneNo,
//                     comment: item.comment,
//                     nextUpdate: item.nextUpdate.split("T")[0],
//                   });
//                   setEditDiscussionId(item._id);
//                   setIsEditing(true);
//                   setIsRevOpen(true);
//                 }}
//                 className="hover:bg-gray-50 transition-all cursor-pointer"
//               >
//                 <td className="p-3 text-center">{new Date(item.date).toLocaleDateString("en-IN")}</td>
//                 <td className="p-3 text-center">{item.clientName}</td>
//                 <td className="p-3 text-center">{item.discussedBy}</td>
//                 <td className="p-3 text-center">{item.phoneNo}</td>
//                 <td className="p-3 text-center">{item.comment}</td>
//                 <td className="p-3 text-center">
//                   {item.nextUpdate ? new Date(item.nextUpdate).toLocaleDateString("en-IN") : "N/A"}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Add Discussion Modal */}
//       {isRevOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm transition-opacity duration-300">
//           <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden transform transition-all duration-300 ">
//             <div className="flex justify-between items-center border-b border-gray-100 p-3 bg-gradient-to-r from-blue-50 to-indigo-50">
//               <h3 className="text-2xl font-bold text-gray-800">
//                 {isEditing ? "Edit Discussion" : "Add New Discussion"}
//               </h3>
//               <button
//                 onClick={() => setIsRevOpen(false)}
//                 className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="p-6 space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Date Field */}
//                 <div className="space-y-2">
//                   <label
//                     className="block text-sm font-medium text-gray-700"
//                     htmlFor="date"
//                   >
//                     Date <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="date"
//                     id="date"
//                     name="date"
//                     value={formData.date}
//                     onChange={handleInputChange}
//                     className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
//                     required
//                   />
//                 </div>

//                 {/* Client Name Field */}
//                 <div className="space-y-2">
//                   <label
//                     className="block text-sm font-medium text-gray-700"
//                     htmlFor="clientName"
//                   >
//                     Client Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="clientName"
//                     name="clientName"
//                     value={formData.clientName}
//                     onChange={handleInputChange}
//                     className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
//                     required
//                     placeholder="Client name"
//                   />
//                 </div>

//                 {/* Discussed By Field */}
//                 <div className="space-y-2">
//                   <label
//                     className="block text-sm font-medium text-gray-700"
//                     htmlFor="discussedBy"
//                   >
//                     Discussed By <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="discussedBy"
//                     name="discussedBy"
//                     value={formData.discussedBy}
//                     onChange={handleInputChange}
//                     className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
//                     required
//                     placeholder="Person who discussed"
//                   />
//                 </div>

//                 {/* Phone No Field */}
//                 <div className="space-y-2">
//                   <label
//                     className="block text-sm font-medium text-gray-700"
//                     htmlFor="phoneNo"
//                   >
//                     Phone No <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="phoneNo"
//                     name="phoneNo"
//                     value={formData.phoneNo}
//                     onChange={handleInputChange}
//                     className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
//                     required
//                     placeholder="Phone number"
//                   />
//                 </div>

//                 {/* Next Update Field */}
//                 <div className="space-y-2">
//                   <label
//                     className="block text-sm font-medium text-gray-700"
//                     htmlFor="nextUpdate"
//                   >
//                     Next Update Date
//                   </label>
//                   <input
//                     type="date"
//                     id="nextUpdate"
//                     name="nextUpdate"
//                     value={formData.nextUpdate}
//                     onChange={handleInputChange}
//                     className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
//                   />
//                 </div>
//               </div>

//               {/* Comment Field */}
//               <div className="space-y-2">
//                 <label
//                   className="block text-sm font-medium text-gray-700"
//                   htmlFor="comment"
//                 >
//                   Comment <span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                   id="comment"
//                   name="comment"
//                   value={formData.comment}
//                   onChange={handleInputChange}
//                   className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
//                   rows="3"
//                   placeholder="Discussion details..."
//                   required
//                 />
//               </div>

//               {/* Form Actions */}
//               <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
//                 <button
//                   type="button"
//                   onClick={() => setIsRevOpen(false)}
//                   className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all duration-200"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all duration-200 shadow-sm shadow-blue-100"
//                 >
//                   <div className="flex items-center gap-2">
//                     <svg
//                       className="w-4 h-4"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M12 4v16m8-8H4"
//                       />
//                     </svg>
//                     {isEditing ? "Update Discussion" : "Add Discussion"}
//                   </div>
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DiscussionRevenue;