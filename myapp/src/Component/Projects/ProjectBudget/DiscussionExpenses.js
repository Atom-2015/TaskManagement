import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExpenseDiscussion } from '../../../FeatureRedux/expenceDiscussionSlice/getExpenceDiscussion';
import { deleteExpenceDiscussion } from '../../../FeatureRedux/expenceDiscussionSlice/deleteExpenceDiscussion';
import AddButtonDiscussionExpense from './addButtonDiscussionExpense';
import { FaTrash } from 'react-icons/fa';

const DiscussionExpenses = ({ projectId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (projectId) {
      dispatch(getExpenseDiscussion({ projectId }));
    }
  }, [dispatch, projectId]);

  
//   async function handleclick(rahul){
//   await dispatch(deleteExpenceDiscussion({rahul}));
//   // await dispatch(getExpenseDiscussion({projectId}));
//     console.log('this is fiifj', rahul);
//     //  alert(`this is the id of delete item ${rahul}`)
  
//   }

  async function handleDelete(rahul) {
    try {
       await dispatch(deleteExpenceDiscussion({rahul}));
      // await dispatch(deleteExpenceDiscussion({ 
      //   discussionid: discussionId, 
      //   projectId: projectId 
      // }));
      // Refresh the list after successful deletion
      // dispatch(getExpenseDiscussion({ projectId }));
    } catch (error) {
      console.error('Error deleting discussion:', error);
    }
  }

  const { getData, isError, isLoading, isSuccess } = useSelector(
    (state) => state.getExpenseDiscussion
  );

  return (
    <div className='flex items-center justify-center'>
      <div className='w-[97%] bg-white rounded-xl shadow-md overflow-x-auto'>
        <table className='w-full text-sm text-gray-800'>
          <thead className='bg-red-600 text-white text-[15px]'>
            <tr>
              <th className='p-2 text-center'>Date</th>
              <th className='p-2 text-center'>Client Name</th>
              <th className='p-2 text-center'>Discussed By</th>
              <th className='p-2 text-center'>Pending</th>
              <th className='p-2 text-center'>Comment</th>
              <th className='p-2 text-center'>Next FollowUp</th>
              <th className='p-2 text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(getData) && getData.length > 0 ? (
              getData.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className='p-3 text-center'>
                    {new Date(item.createdAt || item._id.toString().substring(0, 8)).toLocaleDateString()}
                  </td>
                  <td className='p-3 text-center'>{item.clientName}</td>
                  <td className='p-3 text-center'>{item.discussedBy}</td>
                  <td className='p-3 text-center'>{item.pending ? 'Yes' : 'No'}</td>
                  <td className='p-3 text-center'>{item.comment}</td>
                  <td className='p-3 text-center'>
                    {new Date(item.nextFollowUp).toLocaleDateString()}
                  </td>
                  <td className='p-3 text-center'>
                    <button 
                      onClick={() => handleDelete(item._id)}
                      className='text-red-600 hover:text-red-800'
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className='p-3 text-center text-gray-500'>
                  {isLoading ? 'Loading...' : isError ? 'Failed to load data' : 'No discussions found'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiscussionExpenses;

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getExpenseDiscussion } from '../../../FeatureRedux/expenceDiscussionSlice/getExpenceDiscussion';
// import { deleteExpenceDiscussion } from '../../../FeatureRedux/expenceDiscussionSlice/deleteExpenceDiscussion';
// import AddButtonDiscussionExpense from './addButtonDiscussionExpense';
// import { FaTrash } from 'react-icons/fa';


// const DiscussionExpenses = ({ projectId }) => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (projectId) {
//       dispatch(getExpenseDiscussion({ projectId }));
//     }
//   }, [dispatch, projectId]);

//   async function handleclick(rahul){
//   await dispatch(deleteExpenceDiscussion({rahul}));
//   // await dispatch(getExpenseDiscussion({projectId}));
//     console.log('this is fiifj', rahul);
//     //  alert(`this is the id of delete item ${rahul}`)
  
//   }

//   const { getData, isError, isLoading, isSuccess } = useSelector(
//     (state) => state.getExpenseDiscussion
//   );

//   console.log('This is data from expense discussion', getData);

//   return (
//     <div className='flex items-center justify-center'>

//       <div className='w-[97%] bg-white rounded-xl shadow-md overflow-x-auto'>
//         <table className='w-full text-sm text-gray-800'>
//           <thead className='bg-red-600 text-white text-[15px]'>
//             <tr>
//               <th className='p-2 text-center'>Date</th>
//               <th className='p-2 text-center'>Client Name</th>
//               <th className='p-2 text-center'>Discussed By</th>
//               <th className='p-2 text-center'>Pending</th>
//               <th className='p-2 text-center'>Comment</th>
//               <th className='p-2 text-center'>Next FollowUp</th>
//               <th className='p-2 text-center'>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Array.isArray(getData) && getData.length > 0 ? (
//               getData.map((item) => (
//                 <tr key={item._id} className="border-b">
//                   <td className='p-3 text-center'>
//                     {new Date(item.createdAt || item._id.toString().substring(0, 8)).toLocaleDateString()}
//                   </td>
//                   <td className='p-3 text-center'>{item.clientName}</td>
//                   <td className='p-3 text-center'>{item.discussedBy}</td>
//                   <td className='p-3 text-center'>{item.pending ? 'Yes' : 'No'}</td>
//                   <td className='p-3 text-center'>{item.comment}</td>
//                   <td className='p-3 text-center'>
//                     {new Date(item.nextFollowUp).toLocaleDateString()}
//                   </td>
//                   <td className='p-3 text-center'>
//                     <button className='text-red-600 hover:text-red-800'>
//                       <FaTrash onClick={()=>handleclick(item._id)}/>
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className='p-3 text-center text-gray-500'>
//                   {isLoading ? 'Loading...' : isError ? 'Failed to load data' : 'No discussions found'}
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default DiscussionExpenses;
