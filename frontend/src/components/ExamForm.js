import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './examForm.css'; // Import the CSS file

const ExamForm = () => {
  const [examID, setExamID] = useState('');
  const [examType, setExamType] = useState('');
  const [examinerType, setExaminerType] = useState('');
  const [examDate, setExamDate] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const examFormRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    });

    if (examFormRef.current) {
      observer.observe(examFormRef.current);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/exam/create', {
        examID, 
        examType,
        examiner: examinerType,
        date: examDate, 
      });
      console.log(response.data);
      alert('Exam created successfully!');
      setErrorMessage(''); 
    } catch (error) {
      console.error('Error creating exam', error);
      setErrorMessage(error.response?.data?.message || 'Failed to create exam'); 
    }
  };

  return (
    <div className="exam-form-container" ref={examFormRef}>
      <h1 style={{ textAlign: 'center' }}>
          <b>
            <span className="bill">Bill</span>
            <span className="eval">Eval</span>
          </b>
          </h1>
          <hr style={{ border: 'none', height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.192)', margin: '10px 0' }} />

      <h3>Create Exam</h3>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message if any */}
      <form onSubmit={handleSubmit}>
      <label>
          Exam ID (must be unique):
          <input
            type="text"
            placeholder="Enter a unique Exam ID"
            value={examID}
            onChange={(e) => setExamID(e.target.value)}
            required/>
        </label>

        <label>
          Select Exam Type:
          <select value={examType} onChange={(e) => setExamType(e.target.value)} required>
            <option value="">Select</option>
            <option value="viva">Viva</option>
            <option value="practical">Practical</option>
          </select>
        </label>

        <label>
          Select Examiner Type:
          <select value={examinerType} onChange={(e) => setExaminerType(e.target.value)} required>
            <option value="">Select</option>
            <option value="internal">Internal</option>
            <option value="external">External</option>
          </select>
        </label>

        <label>
          Select Exam Date:
          <input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} required />
        </label>

        <button type="submit" className="create-exam-btn">Create Exam</button>
      </form>
    </div>
  );
};

export default ExamForm;
