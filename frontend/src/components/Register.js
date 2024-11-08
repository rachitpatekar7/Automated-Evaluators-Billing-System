import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [subject, setSubject] = useState(''); // New state for subject
  const [qualification, setQualification] = useState(''); // New state for qualification
  const [errorMessage, setErrorMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false); // For scroll effect
  const history = useHistory();
  const containerRef = useRef(null); // Reference for the container

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!name || !email || !password || !subject || !qualification) {
      alert('All fields are required');
      return;
    }

    try {
      // Sending the form data to the backend
      await axios.post('http://localhost:5000/api/auth/register', { name, email, password, subject, qualification });
      
      // Redirect after successful registration
      history.push('/');  
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.message : 'Registration failed');
      console.error('Registration failed:', error);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true); // Set to true when the element is in view
        observer.unobserve(containerRef.current); // Stop observing after it becomes visible
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current); // Start observing the container
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current); // Clean up the observer
      }
    };
  }, [containerRef]);

  return (
    <div className={`login-container ${isVisible ? 'fade-in' : ''}`} ref={containerRef}>
      <h1>
        <span className="bill">Bill</span>
        <span className="eval">Eval</span>
      </h1>
      <h3>Register</h3>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message if any */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          type="text"
          placeholder="Qualification"
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
        />
        <div className="button-group">
          <button type="submit" className="login-btn">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
