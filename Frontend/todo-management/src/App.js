// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// // Component Imports
// import ProjectList from './components/Projects/ProjectList';
// // import AddProject from './components/AddProject';
// // import TodoList from './components/TodoList';
// // import AddTodo from './components/AddTodo';

// const App = () => {
//   return (
//     <Router>
//       <div>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/add-project">Add Project</Link>
//             </li>
//           </ul>
//         </nav>

//         <hr />

//         <Routes>
//           <Route path="/" element={<ProjectList />} />
//           {/* <Route path="/add-project" element={<AddProject />} /> */}
//           {/* <Route path="/projects/:projectId/todos" element={<TodoList />} /> */}
//           {/* <Route path="/projects/:projectId/add-todo" element={<AddTodo />} /> */}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;



import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import ProjectList from './components/Projects/ProjectList';
import Login from './components/Login/LoginPage';
import ProjectDetails from './components/Projects/ProjectDetails';



const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated by checking localStorage
    const authStatus = localStorage.getItem('auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>

        <hr /> */}

        <Routes>
          {/* Protect the home page and redirect to login if not authenticated */}
          {/* <Route path="/" element={isAuthenticated ? <ProjectList /> : <Navigate to="/" />} /> */}
          
          {/* Login page */}
          <Route path="/" element={<Login  />} />
          <Route path="/projectlist" element={<ProjectList />} />
          <Route path="/projects/:id" element={<ProjectDetails />} /> {/* Project Details */}


        </Routes>
      </div>
    </Router>
  );
};

export default App;

