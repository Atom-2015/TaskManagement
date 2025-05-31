import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExpenseDiscussion } from '../../../FeatureRedux/expenceDiscussionSlice/getExpenceDiscussion';
import AddButtonDiscussionExpense from './addButtonDiscussionExpense';

const DiscussionExpenses = ({ projectId ,expenseDisSearch}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (projectId) {
      dispatch(getExpenseDiscussion({ projectId }));
    }
  }, [dispatch, projectId]);

  


useEffect(() => {
  const originalStyle = window.getComputedStyle(document.body).overflow;
  document.body.style.overflow = "hidden"; // ✅ prevent scroll

  return () => {
    document.body.style.overflow = originalStyle; // 🧹 restore scroll
  };
}, []);


  const { getData, isError, isLoading, isSuccess } = useSelector(
    (state) => state.getExpenseDiscussion
  );

  const filteredData = Array.isArray(getData)
  ? getData.filter((item) =>
      item.clientName?.toLowerCase().includes(expenseDisSearch?.toLowerCase()) ||
      item.comment?.toLowerCase().includes(expenseDisSearch?.toLowerCase())
    )
  : [];


  console.log('This is data from expense discussion', getData);

  return (
    <div className='flex items-center justify-center'>
       
      <div className='w-[97%] bg-white rounded-xl shadow-md overflow-x-auto'>
         <div className="max-h-[200px] overflow-y-auto">
        <table className='w-full text-sm text-gray-800'>
          <thead className='bg-red-600 text-white text-[15px]'>
            <tr>
              <th className='p-2 text-center'>Date</th>
              <th className='p-2 text-center'>Client Name</th>
              <th className='p-2 text-center'>Discussed By</th>
              <th className='p-2 text-center'>Pending</th>
              <th className='p-2 text-center'>Comment</th>
              <th className='p-2 text-center'>Next FollowUp</th>
            </tr>
          </thead>
         <tbody>
  {filteredData.length > 0 ? (
    filteredData.map((item) => (
      <tr key={item._id} className="border-b">
        <td className='p-3 text-center'>
          {new Date(item.createdAt).toLocaleDateString()}
        </td>
        <td className='p-3 text-center'>{item.clientName}</td>
        <td className='p-3 text-center'>{item.discussedBy}</td>
        <td className='p-3 text-center'>{item.pending ? 'Yes' : 'No'}</td>
        <td className='p-3 text-center'>{item.comment}</td>
        <td className='p-3 text-center'>
          {new Date(item.nextFollowUp).toLocaleDateString()}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6" className='p-3 text-center text-gray-500'>
        {isLoading ? 'Loading...' : isError ? 'Failed to load data' : 'No matching discussions found'}
      </td>
    </tr>
  )}
</tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default DiscussionExpenses;
