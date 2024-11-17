
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import ProjectList from './components/Projects/ProjectList';
import Login from './components/Login/LoginPage';
import ProjectDetails from './components/Projects/ProjectDetails';



const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <div>



        <Routes>

          {/* Login page */}
          <Route path="/" element={<Login />} />
          <Route path="/projectlist" element={<ProjectList />} />
          <Route path="/projects/:id" element={<ProjectDetails />} /> {/* Project Details */}


        </Routes>
      </div>
    </Router>
  );
};

export default App;

