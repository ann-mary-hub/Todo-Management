// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import './ProjectDetails.css';

// const ProjectDetails = () => {
//   const { id } = useParams(); // Get the project ID from the URL
//   const [project, setProject] = useState(null);

//   useEffect(() => {
//     // Fetch the project details from the backend
//     axios.get(`http://localhost:8083/api/projects/${id}`)
//       .then(response => setProject(response.data))
//       .catch(error => console.log('Error fetching project details', error));
//   }, [id]);

//   if (!project) {
//     return <div>Loading...</div>; // Show a loading state while fetching data
//   }

//   return (
//     <div className="project-details-container">
//       <h1>{project.title}</h1>
//       <p><strong>Created Date:</strong> {new Date(project.createdAt).toLocaleDateString()}</p>

//       {project.todos && project.todos.length > 0 && (
//         <div className="project-todos">
//           <h2>To-Do List</h2>
//           <ul>
//             {project.todos.map((todo, index) => (
//               <li key={index}>
//                 <p><strong>Description:</strong> {todo.description}</p>
//                 <p><strong>Status:</strong> {todo.completed ? 'Completed' : 'Pending'}</p>
//                 <p><strong>Created Date:</strong> {new Date(todo.createdAt).toLocaleDateString()}</p>
//                 <p><strong>Last Updated:</strong> {new Date(todo.updatedAt).toLocaleDateString()}</p>


//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProjectDetails;




// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import './ProjectDetails.css';

// const ProjectDetails = () => {
//   const { id } = useParams(); // Get the project ID from the URL
//   const [project, setProject] = useState(null);
//   const [editingTitle, setEditingTitle] = useState(false);
//   const [newTitle, setNewTitle] = useState('');
//   const [newTodo, setNewTodo] = useState({ description: '', completed: false });

//   useEffect(() => {
//     // Fetch the project details from the backend
//     axios.get(`http://localhost:8083/api/projects/${id}`)
//       .then(response => setProject(response.data))
//       .catch(error => console.log('Error fetching project details', error));
//   }, [id]);

//   const handleTitleEdit = () => {
//     if (!editingTitle) {
//       setNewTitle(project.title);
//     } else {
//       // Save the updated title to the backend
//       axios.put(`http://localhost:8083/api/projects/${id}`, { title: newTitle })
//         .then(response => setProject(response.data))
//         .catch(error => console.log('Error updating project title', error));
//     }
//     setEditingTitle(!editingTitle);
//   };

//   const handleTodoAction = (action, todo) => {
//     if (action === 'add') {
//       // Add a new todo
//       axios.post(`http://localhost:8083/api/todos/${id}`, newTodo)
//         .then(response => {
//           setProject(prev => ({
//             ...prev,
//             todos: [...prev.todos, response.data],
//           }));
//           setNewTodo({ description: '', completed: false });
//         })
//         .catch(error => console.log('Error adding todo', error));
//     } else if (action === 'update') {
//       // Update an existing todo
//       axios.put(`http://localhost:8083/api/todos/${id}`, todo)
//         .then(response => {
//           setProject(prev => ({
//             ...prev,
//             todos: prev.todos.map(t => (t.id === todo.id ? response.data : t)),
//           }));
//         })
//         .catch(error => console.log('Error updating todo', error));
//     } else if (action === 'remove') {
//       // Remove a todo
//       axios.delete(`http://localhost:8083/api/todos/${id}`)
//         .then(() => {
//           setProject(prev => ({
//             ...prev,
//             todos: prev.todos.filter(t => t.id !== todo.id),
//           }));
//         })
//         .catch(error => console.log('Error removing todo', error));
//     }
//   };

//   const exportAsGist = () => {
//     const summary = `
//       Project: ${project.title}
//       Todos:
//       ${project.todos.map(todo => `- ${todo.description} (${todo.completed ? 'Completed' : 'Pending'})`).join('\n')}
//     `;

//     axios.post('https://api.github.com/gists', {
//       files: {
//         'project-summary.txt': {
//           content: summary,
//         },
//       },
//       description: `Project Summary: ${project.title}`,
//       public: false,
//     }, {
//       headers: {
//         Authorization: `Bearer YOUR_GITHUB_PERSONAL_ACCESS_TOKEN`,
//       },
//     })
//       .then(response => alert(`Gist created: ${response.data.html_url}`))
//       .catch(error => console.log('Error creating gist', error));
//   };

//   if (!project) {
//     return <div>Loading...</div>; // Show a loading state while fetching data
//   }

//   return (
//     <div className="project-details-container">
//       {/* Editable Project Title */}
//       <div className="project-title">
//         {editingTitle ? (
//           <input
//             type="text"
//             value={newTitle}
//             onChange={(e) => setNewTitle(e.target.value)}
//           />
//         ) : (
//           <h1>{project.title}</h1>
//         )}
//         <button onClick={handleTitleEdit}>
//           {editingTitle ? 'Save' : 'Edit'}
//         </button>
//       </div>

//       <p><strong>Created Date:</strong> {new Date(project.createdAt).toLocaleDateString()}</p>

//       {/* Add New Todo */}
//       <div className="add-todo">
//         <h2>Add a Todo</h2>
//         <input
//           type="text"
//           placeholder="Description"
//           value={newTodo.description}
//           onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
//         />
//         <label>
//           <input
//             type="checkbox"
//             checked={newTodo.completed}
//             onChange={(e) => setNewTodo({ ...newTodo, completed: e.target.checked })}
//           />
//           Completed
//         </label>
//         <button onClick={() => handleTodoAction('add')}>Add Todo</button>
//       </div>

//       {/* Dropdown for Todos */}
//       {project.todos && project.todos.length > 0 && (
//         <div className="project-todos">
//           <h2>To-Do List</h2>
//           <ul>
//             {project.todos.map((todo, index) => (
//               <li key={index} className="todo-item">
//                 <details>
//                   <summary>{todo.description}</summary>
//                   <p><strong>Status:</strong> {todo.completed ? 'Completed' : 'Pending'}</p>
//                   <p><strong>Created Date:</strong> {new Date(todo.createdAt).toLocaleDateString()}</p>
//                   <p><strong>Last Updated:</strong> {new Date(todo.updatedAt).toLocaleDateString()}</p>
//                   <button onClick={() => handleTodoAction('update', { ...todo, completed: !todo.completed })}>
//                     Mark as {todo.completed ? 'Pending' : 'Completed'}
//                   </button>
//                   <button onClick={() => handleTodoAction('remove', todo)}>Remove</button>
//                 </details>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Export Summary as Gist */}
//       <button onClick={exportAsGist} className="export-gist-button">
//         Export Summary as Secret Gist
//       </button>
//     </div>
//   );
// };

// export default ProjectDetails;




// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import './ProjectDetails.css';

// const ProjectDetails = () => {
//   const { id } = useParams(); // Get the project ID from the URL
//   const [project, setProject] = useState(null);
  // const [editingTitle, setEditingTitle] = useState(false);
  // const [newTitle, setNewTitle] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [newTodo, setNewTodo] = useState({ description: '', completed: false });
//   const [error, setError] = useState('');

//   useEffect(() => {
//     // Fetch the project details from the backend
//     axios.get(`http://localhost:8083/api/projects/${id}`)
//       .then(response => setProject(response.data))
//       .catch(error => console.log('Error fetching project details', error));
//   }, [id]);

  // const handleTitleEdit = () => {
  //   if (!editingTitle) {
  //     setNewTitle(project.title);
  //   } else {
  //     // Save the updated title to the backend
  //     axios.put(`http://localhost:8083/api/projects/${id}`, { title: newTitle })
  //       .then(response => setProject(response.data))
  //       .catch(error => console.log('Error updating project title', error));
  //   }
  //   setEditingTitle(!editingTitle);
  // };
 
//     const handleTodoAction = (action, todo) => {
//     if (action === 'add') {
//       // Add a new todo
//       axios.post(`http://localhost:8083/api/todos/${id}`, newTodo)
//         .then(response => {
//           setProject(prev => ({
//             ...prev,
//             todos: [...prev.todos, response.data],
//           }));
//           setNewTodo({ description: '', completed: false });
//         })
//         .catch(error => console.log('Error adding todo', error));
//     } else if (action === 'update') {
//       // Update an existing todo
//       axios.put(`http://localhost:8083/api/todos/${id}`, todo)
//         .then(response => {
//           setProject(prev => ({
//             ...prev,
//             todos: prev.todos.map(t => (t.id === todo.id ? response.data : t)),
//           }));
//         })
//         .catch(error => console.log('Error updating todo', error));
//     } else if (action === 'remove') {
//       // Remove a todo
//       axios.delete(`http://localhost:8083/api/todos/${id}`)
//         .then(() => {
//           setProject(prev => ({
//             ...prev,
//             todos: prev.todos.filter(t => t.id !== todo.id),
//           }));
//         })
//         .catch(error => console.log('Error removing todo', error));
//     }
  


//   axios.post('https://api.github.com/gists', {
//     files: {
//       'project-summary.txt': {
//         content: summary,
//       },
//     },
//     description: `Project Summary: ${project.title}`,
//     public: false,
//   }, {
//     headers: {
//       Authorization: `Bearer YOUR_GITHUB_PERSONAL_ACCESS_TOKEN`,
//     },
//   })
//     .then(response => alert(`Gist created: ${response.data.html_url}`))
//     .catch(error => console.log('Error creating gist', error));
// };


//   if (!project) {
//     return <div>Loading...</div>; // Show a loading state while fetching data
//   }

//   return (
//     <div className="project-details-container">
      // <div className="project-title">
      //   {editingTitle ? (
      //     <input
      //       type="text"
      //       value={newTitle}
      //       onChange={(e) => setNewTitle(e.target.value)}
      //     />
      //   ) : (
      //     <h1>{project.title}</h1>
      //   )}
      //   <button onClick={handleTitleEdit}>
      //     {editingTitle ? 'Save' : 'Edit'}
      //   </button>
      // </div>
//       {/* Project Details */}
//       <div className="project-details">
//         <h1>{project.title}</h1>
//         <p><strong>Created Date:</strong> {new Date(project.createdAt).toLocaleDateString()}</p>
//       </div>

//       {/* To-Do List */}
//       {project.todos && project.todos.length > 0 && (
//         <div className="project-todos">
//           <h2>To-Do List</h2>
//           <ul>
//             {project.todos.map((todo, index) => (
//               <li key={index} className="todo-item">
//                 <details>
//                   <summary>{todo.description}</summary>
//                   <p><strong>Status:</strong> {todo.completed ? 'Completed' : 'Pending'}</p>
//                   <p><strong>Created Date:</strong> {new Date(todo.createdAt).toLocaleDateString()}</p>
//                   <p><strong>Last Updated:</strong> {new Date(todo.updatedAt).toLocaleDateString()}</p>
//                 </details>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Button to Open Add Todo Modal */}
//       <button className="add-todo-button" onClick={() => setShowModal(true)}>
//         Add New Todo
//       </button>

//       {/* Modal for Adding a New Todo */}
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h2>Add New Todo</h2>
//             <div className="form-group">
//               <label>Description <span className="mandatory">*</span></label>
//               <input
//                 type="text"
//                 value={newTodo.description}
//                 onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
//                 placeholder="Enter description"
//               />
//             </div>
//             <div className="form-group">
//               <label>
//                 <input
//                   type="checkbox"
//                   checked={newTodo.completed}
//                   onChange={(e) => setNewTodo({ ...newTodo, completed: e.target.checked })}
//                 />
//                 Mark as Completed
//               </label>
//             </div>
//             {error && <p className="error">{error}</p>}
//             <div className="modal-actions">
//               <button className="save-button" onClick={handleAddTodo}>Save</button>
//               <button className="cancel-button" onClick={() => { setShowModal(false); setError(''); }}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProjectDetails;



import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProjectDetails.css';

const ProjectDetails = () => {
  const { id } = useParams(); // Get the project ID from the URL
  const [project, setProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newTodo, setNewTodo] = useState({ description: '', completed: false });
  const [error, setError] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedDescription, setEditedDescription] = useState('');
  const [editingTitle, setEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    // Fetch the project details from the backend
    axios.get(`http://localhost:8083/api/projects/${id}`)
      .then(response => setProject(response.data))
      .catch(error => console.log('Error fetching project details', error));
  }, [id]);

  const handleTitleEdit = () => {
    if (!editingTitle) {
      setNewTitle(project.title);
    } else {
      // Save the updated title to the backend
      axios.put(`http://localhost:8083/api/projects/${id}`, { title: newTitle })
        .then(response => setProject(response.data))
        .catch(error => console.log('Error updating project title', error));
    }
    setEditingTitle(!editingTitle);
  };

  const handleAddTodo = () => {
    if (!newTodo.description) {
      setError('Description is mandatory!');
      return;
    }

    axios.post(`http://localhost:8083/api/todos/${id}`, newTodo)
      .then(response => {
        setProject(prev => ({
          ...prev,
          todos: [...prev.todos, response.data],
        }));
        setNewTodo({ description: '', completed: false });
        setShowModal(false);
        setError('');
      })
      .catch(error => console.log('Error adding todo', error));
  };

  const handleEditTodo = (todoId, description) => {
    setEditingTodoId(todoId);
    setEditedDescription(description);
  };

  const handleSaveEdit = (todoId) => {
    axios.put(`http://localhost:8083/api/todos/${todoId}`, { description: editedDescription })
      .then(response => {
        setProject(prev => ({
          ...prev,
          todos: prev.todos.map(todo => 
            todo.id === todoId ? { ...todo, description: editedDescription } : todo
          ),
        }));
        setEditingTodoId(null);
        setEditedDescription('');
      })
      .catch(error => console.log('Error editing todo', error));
  };

  // const handleToggleCompletion = (todoId, completed) => {
  //   axios.put(`http://localhost:8083/api/todos/${todoId}/complete`, { completed: !completed })
  //     .then(response => {
  //       setProject(prev => ({
  //         ...prev,
  //         todos: prev.todos.map(todo => 
  //           todo.id === todoId ? { ...todo, completed: !completed } : todo
  //         ),
  //       }));
  //     })
  //     .catch(error => console.log('Error updating todo completion', error));
  // };

  // const handleTogglePending = (todoId, pending) => {
  //   axios.put(`http://localhost:8083/api/todos/${todoId}/pending`, { pending: !pending })
  //     .then(response => {
  //       setProject(prev => ({
  //         ...prev,
  //         todos: prev.todos.map(todo => 
  //           todo.id === todoId ? { ...todo, pending: !pending } : todo
  //         ),
  //       }));
  //     })
  //     .catch(error => console.log('Error updating todo pending', error));
  // };
  const handleToggleStatus = (todoId, currentStatus) => {
    // Determine the new status
    const newStatus = currentStatus === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
  
    // Prepare the API endpoint based on the status
    const apiEndpoint = newStatus === 'COMPLETED' 
      ? `http://localhost:8083/api/todos/${todoId}/complete` 
      : `http://localhost:8083/api/todos/${todoId}/pending`;
  
    // Prepare the body for the API call (you may need to adjust depending on how the backend expects the request)
    const body = newStatus === 'COMPLETED' 
      ? { completed: true } 
      : { pending: true };
  
    axios.put(apiEndpoint, body)
      .then(response => {
        // Update the state of the todo list to reflect the new status
        setProject(prev => ({
          ...prev,
          todos: prev.todos.map(todo => 
            todo.id === todoId ? { ...todo, status: newStatus } : todo
          ),
        }));
      })
      .catch(error => console.log('Error toggling todo status', error));
  };
  
  const handleDeleteTodo = (todoId) => {
    axios.delete(`http://localhost:8083/api/todos/${todoId}`)
      .then(() => {
        setProject(prev => ({
          ...prev,
          todos: prev.todos.filter(todo => todo.id !== todoId),
        }));
      })
      .catch(error => console.log('Error deleting todo', error));
  };

  if (!project) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return 'Invalid Date'; // In case of invalid date
    }
    return date.toLocaleString(); // Formats date to a readable string
  };


  const exportAsGist = () => {
    axios
      .post(`http://localhost:8083/api/projects/${id}/export-gist`)
      .then((response) => {
        const gistUrl = JSON.parse(response.data).html_url;
        console.log("Hii" +response)
        // GitHub API returns the gist URL
        alert(`Gist created successfully: ${gistUrl}`);
    })
      .catch((error) => {
        console.error('Error exporting gist:', error);
        alert('Failed to export project as gist.');
      });
  };
  return (
    <div className="project-details-container">
      <div className="project-title">
        {editingTitle ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        ) : (
          <h1>{project.title}</h1>
        )}
        <button onClick={handleTitleEdit} className='project-title-edit'>
          {editingTitle ? 'Save' : 'Edit Title'}
        </button>
      </div>
      {/* Project Details */}
      <div className="project-details">
        {/* <h1>{project.title}</h1> */}
        <p><strong>Created Date:</strong> {formatDate(project.createdDate)}</p>
      </div>

      {/* To-Do List as Cards */}
      {project.todos && project.todos.length > 0 && (
        <div className="project-todos">
          <h2>To-Do List</h2>
          <div className="todo-cards">
            {project.todos.map((todo) => (
              <div key={todo.id} className="todo-card">
                <div className="todo-card-header">
                  <h3>{todo.description}</h3>
                  <div>
                    {/* <button onClick={() => handleToggleCompletion(todo.id, todo.completed)}>
                      Mark as {todo.completed ? 'Pending' : 'Completed'}
                    </button> */}

<button
              onClick={() => handleToggleStatus(todo.id, todo.status)}
              disabled={todo.status === 'COMPLETED' && todo.completed || todo.status === 'PENDING' && todo.pending}
            >
              {todo.status === 'COMPLETED' ? 'Mark as Pending' : 'Mark as Complete'}
            </button>
                    <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>

                    
                    <button onClick={() => handleEditTodo(todo.id, todo.description)}>Edit
                    </button>
                  </div>
                </div>
                {editingTodoId === todo.id ? (
                  <div className="edit-todo">
                    <input
                      type="text"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                    />
                    <button onClick={() => handleSaveEdit(todo.id)}>Save</button>
                  </div>
                ) : (
                  <div className="todo-card-details">
<p><strong>Status:</strong> {todo.status === 'COMPLETED' ? 'Completed' : 'Pending'}</p>
<p><strong>Created Date:</strong> {formatDate(todo.createdDate)}</p>
                    <p><strong>Last Updated:</strong> {formatDate(todo.updatedDate)}</p>
                  </div>
                )}
     
              </div>
            ))}
          </div>
       
        </div>
      )}

      {/* Button to Open Add Todo Modal */}
      <button className="add-todo-button" onClick={() => setShowModal(true)}>
        Add New Todo
      </button>

      {/* Modal for Adding a New Todo */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Todo</h2>
            <div className="form-group">
              <label>Description <span className="mandatory">*</span></label>
              <input
                type="text"
                value={newTodo.description}
                onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                placeholder="Enter description"
              />
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={newTodo.completed}
                  onChange={(e) => setNewTodo({ ...newTodo, completed: e.target.checked })}
                />
                
                Mark as Completed
              </label>
            </div>
            {error && <p className="error">{error}</p>}
            <div className="modal-actions">
              <button className="save-button" onClick={handleAddTodo}>Save</button>
              <button className="cancel-button" onClick={() => { setShowModal(false); setError(''); }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
                    <button onClick={exportAsGist} className="export-gist-button">
      Export as Gist
    </button>
    </div>
  );
};

export default ProjectDetails;
