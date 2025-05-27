import React, { useState } from 'react';

const LeaveAnnouce = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className='fixed inset-0 z-50 flex items-center justify-center'>

        <div className='fixed inset-0 blur-md bg-opacity-50'>

        </div>

            {/*okay bro yaha pe tumhra midal*/}
            <div className='relative bg-white p-4 rounded-sm shadow-lg z-50 w-full max-w-md'>
              <div className='flex justify-between items-center mb-4'>

              </div>
            </div>

      </div>
    </>
  );
};

export default LeaveAnnouce;
