// import React from 'react'
// import Projectlist from './projectlist'
// import AddProjectButton from './addProjectButton'

// function ProjectIndex() {
//   return (
//     <div className='bg-red-300' >
//       <h1 className=' text-white ' >Project Management</h1>
//       <AddProjectButton  className='  ' />
//       <Projectlist/>
//     </div>
//   )
// }

// export default ProjectIndex


import React from "react";
import Projectlist from "./projectlist";
import AddProjectButton from "./addProjectButton";

function ProjectIndex() {
  return (
    <div className=" p-4">
      <h1 className="text-white text-xl font-bold mb-4">Project Management</h1>
      <div className="flex  items-center mb-4">
        <div className="ml-auto">          
          <AddProjectButton />
        </div>
      </div>
      <Projectlist />
    </div>
  );
}

export default ProjectIndex;
