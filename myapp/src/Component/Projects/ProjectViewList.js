import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { projectdetails } from '../../FeatureRedux/projectSlice/detailproject';
import { useDispatch } from 'react-redux';

const ProjectViewList = () => {
  const [project, setProject] = useState(null);
  const { id } = useParams();
  const projects = useSelector((state) => state.projectdetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(projectdetails(id));
  }, [dispatch, id]);

  // Optional: Set the project state if needed
  useEffect(() => {
    if (projects.task) {
      setProject(projects.task);
    }
  }, [projects]);

  console.log("Projects in ViewList:", JSON.stringify(projects.task));

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full h-auto max-h-[100vh] overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Project Details</h1>
        <table className="w-full border-collapse border p-4 border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Task Title</th>
              <th className="border border-gray-300 p-2">Task Status</th>
              <th className="border border-gray-300 p-2">Task Priority</th>
              <th className="border border-gray-300 p-2">Repeat</th>
            </tr>
          </thead>
          <tbody>
            {/* Render a row for each task */}
            {projects.task?.tasks?.length > 0 ? (
              projects.task.tasks.map((task, index) => (
                <tr key={task._id || index}>
                  <td className="border border-gray-300 p-2">{task.title}</td>
                  <td className="border border-gray-300 p-2">{task.status}</td>
                  <td className="border border-gray-300 p-2">{task.priority}</td>
                  <td className="border border-gray-300 p-2">
                    {task.repeat ? "Yes" : "No"}
                  </td>
                </tr>
              ))
            ) : (
              // If no tasks are available, show a single row with "No tasks available"
              <tr>
                <td className="border border-gray-300 p-2" colSpan="4">
                  No tasks available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectViewList;