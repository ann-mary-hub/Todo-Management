
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import './LoginPage.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';



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
            alert('Login failed: ' + "Invalid username or password");
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
            </form>
        </div>
    );
};

export default LoginPage;
