import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './examForm.css'; // Import existing CSS file

const Faculty = () => {
  const [facultyList, setFacultyList] = useState([]);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/auth/faculty',{
          headers: { Authorization: `Bearer ${token}`}
        });
        setFacultyList(response.data);
      } catch (error) {
        console.error('Error fetching faculty information:', error);
      }
    };
    fetchFaculty();
  }, []);
  return (
    <div className="exam-form-container" style={{ opacity: 1, transform: 'none', marginTop: '300px',marginBottom: '100px' }}> {/* Add top margin */}
      <h1 style={{ textAlign: 'center' }}>
        <b>
          <span className="bill">Bill</span>
          <span className="eval">Eval</span>
        </b>
      </h1>
      <hr style={{ border: 'none', height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.192)', margin: '10px 0' }} />

      <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Faculty Information</h3>
      <div style={{
          backgroundColor: '#f9f9f9',
          padding: '15px',
          borderRadius: '5px',
          color: '#0a3732',
      }}>
      {/* Display the faculty list */}
      {facultyList.length > 0 ? (
          facultyList.map((faculty, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <p><strong>Name:</strong> {faculty.name}</p>
              <p><strong>Email:</strong> {faculty.email}</p>
              <p><strong>Subject:</strong> {faculty.subject}</p>
              <p><strong>Qualification:</strong> {faculty.qualification}</p>
              <hr />
            </div>
          ))
        ) : (
          <p>No faculty information available.</p>
        )}
      </div>
    </div>
  );
};

export default Faculty;