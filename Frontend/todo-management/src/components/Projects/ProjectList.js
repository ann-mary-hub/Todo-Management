import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./ProjectList.css";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    // Fetch the list of projects from the backend when the component mounts
    axios.get('http://localhost:8083/api/projects')
      .then(response => setProjects(response.data)) // Update state with fetched projects
      .catch(error => console.log('Error fetching projects', error)); // Handle errors
  }, []); // Empty dependency array means this effect runs once after the component mounts



  const handleProjectClick = (projectId) => {
    // Navigate to the project details page with the project ID
    navigate(`/projects/${projectId}`);
  };
//   return (
//     <div className="project-list-container">
//       <h1 className="project-list-title">Projects</h1>
//       <ul className="project-list">
//         {projects.map(project => (
//           <li key={project.id} className="project-item">
//             <Link to={`/projects/${project.id}/todos`}>
//               {project.title}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };


return (
    <div className="project-list-container">
      <h1 className="project-list-title">Projects</h1>
      <div className="project-list">
        {projects.map((project) => (
          <div
            key={project.id}
            className="project-item"
            onClick={() => handleProjectClick(project.id)}
          >
            <h2>{project.title}</h2>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
