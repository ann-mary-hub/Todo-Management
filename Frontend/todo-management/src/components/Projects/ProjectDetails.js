import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProjectDetails.css';

const ProjectDetails = () => {
  const { id } = useParams(); // Get the project ID from the URL
  const [project, setProject] = useState(null);

  useEffect(() => {
    // Fetch the project details from the backend
    axios.get(`http://localhost:8083/api/projects/${id}`)
      .then(response => setProject(response.data))
      .catch(error => console.log('Error fetching project details', error));
  }, [id]);

  if (!project) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  return (
    <div className="project-details-container">
      <h1>{project.title}</h1>
      <p><strong>Created Date:</strong> {new Date(project.createdAt).toLocaleDateString()}</p>

      {project.todos && project.todos.length > 0 && (
        <div className="project-todos">
          <h2>To-Do List</h2>
          <ul>
            {project.todos.map((todo, index) => (
              <li key={index}>
                <p><strong>Description:</strong> {todo.description}</p>
                <p><strong>Status:</strong> {todo.completed ? 'Completed' : 'Pending'}</p>
                <p><strong>Created Date:</strong> {new Date(todo.createdAt).toLocaleDateString()}</p>
                <p><strong>Last Updated:</strong> {new Date(todo.updatedAt).toLocaleDateString()}</p>


              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
