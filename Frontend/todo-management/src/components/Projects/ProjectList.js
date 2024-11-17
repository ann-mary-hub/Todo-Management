// import React, { useState, useEffect } from 'react';
// import { Link,useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import "./ProjectList.css";

// const ProjectList = () => {
//   const [projects, setProjects] = useState([]);
//   const navigate=useNavigate();

//   useEffect(() => {
//     // Fetch the list of projects from the backend when the component mounts
//     axios.get('http://localhost:8083/api/projects')
//       .then(response => setProjects(response.data)) // Update state with fetched projects
//       .catch(error => console.log('Error fetching projects', error)); // Handle errors
//   }, []); // Empty dependency array means this effect runs once after the component mounts



//   const handleProjectClick = (projectId) => {
//     // Navigate to the project details page with the project ID
//     navigate(`/projects/${projectId}`);
//   };
// //   return (
// //     <div className="project-list-container">
// //       <h1 className="project-list-title">Projects</h1>
// //       <ul className="project-list">
// //         {projects.map(project => (
// //           <li key={project.id} className="project-item">
// //             <Link to={`/projects/${project.id}/todos`}>
// //               {project.title}
// //             </Link>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };


// return (
//     <div className="project-list-container">
//       <h1 className="project-list-title">Projects</h1>
//       <div className="project-list">
//         {projects.map((project) => (
//           <div
//             key={project.id}
//             className="project-item"
//             onClick={() => handleProjectClick(project.id)}
//           >
//             <h2>{project.title}</h2>
//             <p>{project.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProjectList;




import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./ProjectList.css";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of projects from the backend when the component mounts
    axios.get('http://localhost:8083/api/projects')
      .then(response => setProjects(response.data)) // Update state with fetched projects
      .catch(error => console.log('Error fetching projects', error)); // Handle errors
  }, []); // Empty dependency array means this effect runs once after the component mounts

  const handleCreateProject = (e) => {
    e.preventDefault();

    if (!newProjectTitle) {
      setError('A title is required.');
      return;
    }

    // Make API call to create a new project
    axios.post('http://localhost:8083/api/projects', {
      title: newProjectTitle,
      description: newProjectDescription,
      createdDate: new Date().toISOString(), // Optional, backend can handle this
      todos: [],
    })
      .then(response => {
        setProjects([...projects, response.data]); // Update project list
        setNewProjectTitle('');
        setNewProjectDescription('');
        console.log(response.data)
        setError('');
        setSuccessMessage('Project created successfully!');
        setShowForm(false); // Hide the form
      })
      .catch(error => {
        if (error.response?.status === 409) {
          setError('A project with this title already exists.');
        } else {
          setError('Failed to create project. Please try again.');
        }
      });
  };

  const handleProjectClick = (projectId) => {
    // Navigate to the project details page with the project ID
    navigate(`/projects/${projectId}`);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return 'Invalid Date'; // In case of invalid date
    }
    return date.toLocaleString(); // Formats date to a readable string
  };
  return (
    <div>

      {/* Create a Project Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="create-project-button"
      >
        {showForm ? 'Cancel' : 'Create a New Project'}
      </button>

      {/* Form to Create a New Project */}
      {showForm && (
        <form className="create-project-form" onSubmit={handleCreateProject}>
          <input
            type="text"
            placeholder="Project Title"
            value={newProjectTitle}
            onChange={(e) => setNewProjectTitle(e.target.value)}
            className="project-input"
          />
          <textarea
            placeholder="Project Description"
            value={newProjectDescription}
            onChange={(e) => setNewProjectDescription(e.target.value)}
            className="project-textarea"
          />
          <button type="submit" className="submit-project-button">
            Submit
          </button>
        </form>
      )}

      {/* Error and Success Messages */}
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
<div className="project-list-container">
<h1 className="project-list-title">Projects</h1>
      {/* List of Projects */}
      <div className="project-list">
        {projects.map((project) => (
          <div
            key={project.id}
            className="project-item"
            onClick={() => handleProjectClick(project.id)}
          >
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <p>Created on: {formatDate(project.createdDate)}</p>


          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ProjectList;

