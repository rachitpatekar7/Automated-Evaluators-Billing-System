import React, { useState } from 'react';
import axios from 'axios';

const ExamForm = () => {
  const [examType, setExamType] = useState('');
  const [examinerType, setExaminerType] = useState('');
  const [examDate, setExamDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/exam', {
        examType,
        examinerType,
        date: examDate
      });
      console.log(response.data);
      alert('Exam created successfully!');
    } catch (error) {
      console.error('Error creating exam', error);
      alert('Failed to create exam');
    }
  };

  return (
    <div>
      <h2>Exam Form</h2>
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

        <button type="submit">Create Exam</button>
      </form>
    </div>
  );
};

export default ExamForm;
