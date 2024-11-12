import React, { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';


const Dashboard = ({ user }) => {
  const history = useHistory();
  const [isVisible, setIsVisible] = useState(false);
  const [sectionsVisible, setSectionsVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const cardsRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserName(response.data.name); // Set the user name
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);
  
  const goToProfile = () => {
    history.push('/profile');
  };

  const knowOurFaculty = () => {
    history.push('/faculty');
  };

  const handleExamFormClick = () => {
    history.push('/exam-form');
  };

  const handleBillingClick = () => {
    history.push('/billing');
  };

  const goToExamsList = () => {
    history.push('/exams'); 
  };

  const handleScroll = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        setSectionsVisible(true);
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleScroll, {
      threshold: 0.1
    });

    if (cardsRef.current) {
      observer.observe(cardsRef.current);
    }

    sectionsRef.current.forEach(section => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h1 style={{ textAlign: 'center' }}>
          <b>
            <span className="bill">Bill</span>
            <span className="eval">Eval</span>
          </b>
        </h1>
        <br />
        <div className="line" />
        {/* Image added before the welcome message */}
        <div className="profile-section" onClick={goToProfile}>
          <img src={"/image.png"} alt="Profile" className="profile-image" />
          
          <p>
            <h5 style={{ textAlign: 'center', color: 'white' }}>
              View your Profile, { userName || "UserName"}!
            </h5>
          </p>
          
        </div>
        <div className="line" />
        <div className="toolbar-items">
          <button onClick={knowOurFaculty}>Know our Faculty</button>
          <button onClick={handleExamFormClick}>Exam Form</button>
          <button onClick={handleBillingClick}>Billing Section</button>
          <button onClick={goToExamsList}>View All Exams</button>
        </div>
      </aside>

      <main className="main-content">
        <br></br>
        <br></br>
        <br></br>

        {/* Containers for Exam and Billing Sections */}
        <div className={`section-container ${sectionsVisible ? 'fade-in' : ''}`}>
          <div className="section exam-section" ref={el => sectionsRef.current[0] = el}>
            <h3>Select Exam and Examiner</h3>
            <p><span style={{ color: 'white' }}>Manage exam details and create billing receipts for each session.</span></p>
            <Link to="/exam-form">
              <button className="primary-button">Go to Exam Form</button>
            </Link>
          </div>
          <br />
          <div className="section billing-section" ref={el => sectionsRef.current[1] = el}>
            <h3>Billing Section</h3>
            <p><span style={{ color: 'white' }}>Generate your billing receipts based on the hours worked and examiner type.</span></p>
            <Link to="/billing">
              <button className="primary-button">Go to Billing Section</button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
