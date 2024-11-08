import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './examForm.css'; // Import the CSS file

const ExamForm = () => {
  const [examType, setExamType] = useState('');
  const [examinerType, setExaminerType] = useState('');
  const [examDate, setExamDate] = useState('');
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
        examType,
        examinerType,
        date: examDate,
      });
      console.log(response.data);
      alert('Exam created successfully!');
    } catch (error) {
      console.error('Error creating exam', error);
      alert('Failed to create exam');
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
      <form onSubmit={handleSubmit}>
        <label>
          Select Exam Type:
          <select value={examType} onChange={(e) => setExamType(e.target.value)}>
            <option value="">Select</option>
            <option value="viva">Viva</option>
            <option value="practical">Practical</option>
          </select>
        </label>

        <label>
          Select Examiner Type:
          <select value={examinerType} onChange={(e) => setExaminerType(e.target.value)}>
            <option value="">Select</option>
            <option value="internal">Internal</option>
            <option value="external">External</option>
          </select>
        </label>

        <label>
          Select Exam Date:
          <input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} />
        </label>

        <button type="submit" className="create-exam-btn">Create Exam</button>
      </form>
    </div>
  );
};

export default ExamForm;
