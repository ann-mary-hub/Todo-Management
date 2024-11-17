// // src/components/Login.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = ({ setIsAuthenticated }) => {
//   const [user, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       // Send Basic Authentication request
//       const response = await axios.get('http://localhost:8083/api', {
//         auth: {
//           username: user,
//           password: password
//         }
//       });

//       // If authentication is successful, update auth state and redirect to ProjectList
//       if (response.status === 200) {
//         localStorage.setItem('auth', 'true');  // Save auth status in localStorage
//         setIsAuthenticated(true);  // Update authentication state
//         navigate('/');  // Redirect to the home page (ProjectList)
//       }
//     } catch (err) {
//       // Handle error (invalid credentials)
//       setError('Invalid credentials. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>Username: </label>
//           <input
//             type="text"
//             value={user}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password: </label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>

//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// };

// export default Login;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// import "./LoginPage.css"

// function App() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const navigate = useNavigate();
//     const handleLogin = async () => {
//         const credentials = `${username}:${password}`;
//         const headers = new Headers();
//         headers.set('Authorization', 'Basic ' + btoa(credentials));

//         try {
//             const response = await fetch('http://localhost:8083/basic-auth', {
//                 method: 'GET',
//                 headers: headers
//             });

//             if (response.ok) {
//                 const data = await response.text();
//                 setMessage(data); 
//                 navigate('/projectlist');

//                  // On success, show the login message
//             } else {
//                 setMessage('Authentication failed');
                
//             }
//         } catch (error) {
//             setMessage('Error: ' + error.message);
//         }
//         // navigate('/projectlist');
//     };

//     return (
//         <div>
//             <input
//                 type="text"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//             />
//             <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//             />
//             <button onClick={handleLogin}>Login</button>
//             <p>{message}</p>
//         </div>
//     );
// }
// {/* <div className="login-container">
//             <h2>Login</h2>
//             <form className="login-form" onSubmit={handleLogin}>
//                 <div className="form-group">
//                     <input
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         placeholder="Username"
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         placeholder="Password"
//                         required
//                     />
//                 </div>
//                   <button onClick={handleLogin}>Login</button>
//                 {/* Use Link instead of anchor tag */}
//          //  </form>
//           // <p>{message}</p>
//        // </div>
//    // );
//  //};  

// export default App;






import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import './LoginPage.css'; // Import the CSS file for styling
import { useNavigate} from 'react-router-dom';



const LoginPage = () => {
    const navigate = useNavigate(); // Initialize history for navigation
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8083/api/auth/login', {
                username,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                console.log(response.data)
                localStorage.setItem('username', response.data.username);

                alert('Login successful!');
                navigate('/projectlist'); // Redirect to the dashboard page on successful login
            } else {
                alert('Login failed!');
            }
        } catch (error) {
            console.error(error);
            alert('Login failed: ' + "Invalid username or password" );
        }
    };


    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleLogin}>
                <div className="form-group">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                </div>
                <button type="submit">Login</button>
                {/* Use Link instead of anchor tag */}
                <p>Not registered? <Link to="/register">Register</Link></p>
            </form>
        </div>
    );
};

export default LoginPage;
