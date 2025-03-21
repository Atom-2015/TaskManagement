import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import {projectdetails} from '../../FeatureRedux/projectSlice/detailproject'
import { useDispatch } from 'react-redux';

const ProjectViewList = () => {

  const [project,setProject]=useState(null);
  const {id}=useParams();
  // const navigate=useNavigate();

  const projects =useSelector((state)=>state.projectdetails)

  const dispatch = useDispatch()
   useEffect(()=>{
    dispatch(projectdetails(id))
   },[dispatch])

  // useEffect(() => {
  //   const foundProject = projects.find((p) => p._id.toString() === id);
  //   if (foundProject) {
  //     setProject(foundProject);
  //   }
  // }, [id, project]);
  console.log("Projects in ViewList:", JSON.stringify(projects.task.status));
  
  return (
    <div>
        <div className='fixed top-1 left-1 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-1/2'>
            <div className=''></div>
            <h1>{projects.task.name}</h1>
            <p><strong>Status:</strong> {projects.task.status}</p>
        <p><strong>Tasks:</strong> {projects.task.tasks}</p>
        <p><strong>Start Date:</strong> {projects.task.start_date}</p>
        <p><strong>End Date:</strong> {projects.task.end_date}</p>

          </div>

        </div>
    </div>
  )
}

export default ProjectViewList
