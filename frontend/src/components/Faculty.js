import React from 'react';
import './examForm.css'; // Import existing CSS file

const Faculty = () => {
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
        <p style={{ marginBottom: '10px' }}><strong>Subject:</strong> Full Stack Development (FSD)</p>
        <p style={{ marginBottom: '10px' }}><strong>Faculty:</strong> Dr. A. Sharma</p>
        <p style={{ marginBottom: '10px' }}><strong>Qualification:</strong> Ph.D. in Computer Science</p>
        <hr style={{ margin: '10px 0' }} />

        <p style={{ marginBottom: '10px' }}><strong>Subject:</strong> Artificial Intelligence and Machine Learning (AIML)</p>
        <p style={{ marginBottom: '10px' }}><strong>Faculty:</strong> Prof. R. Gupta</p>
        <p style={{ marginBottom: '10px' }}><strong>Qualification:</strong> M.Tech in AIML</p>
        <hr style={{ margin: '10px 0' }} />

        <p style={{ marginBottom: '10px' }}><strong>Subject:</strong> Data-Driven Computer Architecture (DDCA)</p>
        <p style={{ marginBottom: '10px' }}><strong>Faculty:</strong> Dr. M. Nair</p>
        <p style={{ marginBottom: '10px' }}><strong>Qualification:</strong> Ph.D. in Computer Engineering</p>
        <hr style={{ margin: '10px 0' }} />

        <p style={{ marginBottom: '10px' }}><strong>Subject:</strong> Cyber Security and Forensics</p>
        <p style={{ marginBottom: '10px' }}><strong>Faculty:</strong> Prof. S. Mehta</p>
        <p style={{ marginBottom: '10px' }}><strong>Qualification:</strong> M.Sc. in Cyber Security</p>
      </div>
    </div>
  );
};

export default Faculty;
