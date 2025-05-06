import React, { useState } from "react";
import Projectlist from "./projectlist";
import AddProjectButton from "./addProjectButton";

import AddProjectButton1 from "./AddProjectButton1";
import ProjectList1 from "./ProjectList1";
 


function ProjectIndex() {
   
  return (
    <div className=" p-4">
        
       
      {/* <h1 className="text-white text-xl font-bold mb-4">Project Management</h1> */}
      <div className="flex  items-center mb-4">
        {localStorage.getItem("kijiethPanday")=== "jdkfj" ?(<div className="ml-auto">          
          <AddProjectButton1 />
        </div>):""}
      </div>
       {/* <Projectlist />    */}
       <ProjectList1/> 
     
      
    </div>
  );
}


export default ProjectIndex;
