import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';  // Make sure axios is imported for making API requests

const Login = () => {
  // Predefined credentials
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!email || !password) {
      alert('All fields are required');
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);  // Store token after login
      history.push('/dashboard');  // Redirect to dashboard after login
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.message : 'Login failed');
      console.error("Login failed", error);
    }
  };

  const navigateToRegister = () => {
    history.push('/register');  // Redirect to register page
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}  // Update email field if changed
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}  // Update password field if changed
        />
        <div className="button-group">
          <button type="submit" className="login-btn">Login</button>
          <button type="button" className="register-btn" onClick={navigateToRegister}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
