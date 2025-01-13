import React, { useState } from 'react';

function ProjectSetting() {
  const [projectTypes, setProjectTypes] = useState([]); // Stores the list of project types
  const [newProjectType, setNewProjectType] = useState('');
  const [editingIndex, setEditingIndex] = useState(null); // Track which project is being edited
  const [editValue, setEditValue] = useState('');

  // Add new project type
  const addProjectType = () => {
    if (newProjectType.trim() === '') return;
    setProjectTypes([...projectTypes, newProjectType]);
    setNewProjectType('');
  };

  // Delete project type
  const deleteProjectType = (index) => {
    const updatedTypes = projectTypes.filter((_, i) => i !== index);
    setProjectTypes(updatedTypes);
  };

  // Start editing project type
  const startEditing = (index) => {
    setEditingIndex(index);
    setEditValue(projectTypes[index]);
  };

  // Save edited project type
  const saveEdit = () => {
    const updatedTypes = projectTypes.map((type, i) =>
      i === editingIndex ? editValue : type
    );
    setProjectTypes(updatedTypes);
    setEditingIndex(null);
    setEditValue('');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Project Types</h1>

      {/* Add Project Type Section */}
      <div className="mb-4">
        <input
          type="text"
          value={newProjectType}
          onChange={(e) => setNewProjectType(e.target.value)}
          placeholder="Enter project type"
          className="border p-2 mr-2 rounded w-64"
        />
        <button
          onClick={addProjectType}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* Project Types Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Project Type</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projectTypes.map((type, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                ) : (
                  type
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {editingIndex === index ? (
                  <>
                    <button
                      onClick={saveEdit}
                      className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingIndex(null)}
                      className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEditing(index)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProjectType(index)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Message if no project types */}
      {projectTypes.length === 0 && (
        <p className="text-gray-500 mt-4 text-center">No project types added yet.</p>
      )}
    </div>
  );
}

export default ProjectSetting;
