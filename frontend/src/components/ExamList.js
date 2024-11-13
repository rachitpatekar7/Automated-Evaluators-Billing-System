import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './examForm.css'; // Import existing CSS file

const ExamsList = () => {
  const [exams, setExams] = useState([]);
  const [editExamID, setEditExamID] = useState('');
  const [examType, setExamType] = useState('');
  const [examinerType, setExaminerType] = useState('');
  const [examDate, setExamDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/exam/all');
        setExams(response.data);
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };
    fetchExams();
  }, []);

  const handleEditClick = (exam) => {
    setEditExamID(exam.examID);
    setExamType(exam.examType);
    setExaminerType(exam.examiner);
    setExamDate(exam.date.split('T')[0]);
  };

  const handleUpdateExam = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/exam/edit/${editExamID}`, {
        examType,
        examiner: examinerType,
        date: examDate 
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccessMessage('Exam updated successfully');
      setErrorMessage('');
      const response = await axios.get('http://localhost:5000/api/exam/all');
      setExams(response.data);
    } catch (error) {
      console.error('Error updating exam:', error);
      setErrorMessage('Failed to update exam');
      setSuccessMessage('');
    }
  };

  return (
    <div className="exam-form-container fade-in" style={{ marginTop: '300px', marginBottom: '100px' }}>
      <h1 style={{ textAlign: 'center' }}>
        <b>
          <span className="bill">Bill</span>
          <span className="eval">Eval</span>
        </b>
      </h1>
      <hr style={{ border: 'none', height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.192)', margin: '10px 0' }} />

      <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', textAlign: 'center', color: 'white' }}>
        Exams List
      </h3>
      <hr style={{ border: 'none', height: '1px', backgroundColor: '#0a3732', margin: '10px 0' }} />

      <div style={{
          backgroundColor: '#f9f9f9',
          padding: '15px',
          borderRadius: '5px',
          color: '#0a3732',
      }}>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {exams.map((exam) => (
            <li key={exam.examID} className="exam-item" style={{ paddingBottom: '15px', marginBottom: '15px' }}>
              <p><strong>Exam ID:</strong> {exam.examID}</p>
              <p><strong>Exam Type:</strong> {exam.examType}</p>
              <p><strong>Examiner:</strong> {exam.examiner}</p>
              <p><strong>Date:</strong> {new Date(exam.date).toLocaleDateString()}</p>
              <button className="create-exam-btn" onClick={() => handleEditClick(exam)}>Edit</button>
              <hr style={{ border: 'none', height: '1px', backgroundColor: '#ccc', marginTop: '10px' }} />
            </li>
          ))}
        </ul>

        {editExamID && (
          <div className="edit-exam-form" style={{ marginTop: '20px' }}>
            <h3 style={{ color: '#0a3732' }}>Edit Exam</h3>
            <label>
              Exam Type:
              <select value={examType} onChange={(e) => setExamType(e.target.value)} required>
                <option value="">Select</option>
                <option value="viva">Viva</option>
                <option value="practical">Practical</option>
              </select>
            </label>
            <label>
              Examiner Type:
              <select value={examinerType} onChange={(e) => setExaminerType(e.target.value)} required>
                <option value="">Select</option>
                <option value="internal">Internal</option>
                <option value="external">External</option>
              </select>
            </label>
            <label>
              Exam Date:
              <input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} required />
            </label>
            <button className="create-exam-btn" onClick={handleUpdateExam}>Update Exam</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamsList;
