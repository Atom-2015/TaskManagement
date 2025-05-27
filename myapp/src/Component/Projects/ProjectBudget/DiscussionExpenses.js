import React from 'react'

const DiscussionExpenses = () => {
  return (
    <div className='flex items-center justify-center'>
        <div className='w-full bg-white rounded-xl shadow-md overflow-x-auto'>
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
                <tbody >
                    <tr>
                        <td className="p-3 text-center">10-10-2010</td>
                        <td className="p-3 text-center">Sashi Tharoor</td>
                        <td className="p-3 text-center">almost Paid</td>
                        <td className="p-3 text-center">on friday</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default DiscussionExpenses