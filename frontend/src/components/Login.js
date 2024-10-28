import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './login.css'; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();
  const loginRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    });

    if (loginRef.current) {
      observer.observe(loginRef.current);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      history.push('/dashboard');
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.message : 'Login failed');
      alert('Login Failed! Please Try Again.')
      console.error("Login failed", error);
    }
  };

  const navigateToRegister = () => {
    history.push('/register');
  };

  return (
    <div className="login-container" ref={loginRef}>
      <h1>
        <b>
        <span className="bill">Bill</span>
        <span className="eval">Eval</span>      </b>
      </h1>
      <h3 color = "white">Welcome!</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
