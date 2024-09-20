import React, { useState } from 'react';
import axios from 'axios';

const Billing = () => {
  const [examType, setExamType] = useState('');
  const [examiner, setExaminer] = useState('');
  const [hoursWorked, setHoursWorked] = useState('');
  const [amount, setAmount] = useState('');

  const handleGenerateReceipt = async () => {
    try {
      await axios.post('/api/billing/generate', { examType, examiner, hoursWorked, amount });
      alert('Billing receipt generated successfully');
    } catch (error) {
      console.error("Receipt generation failed");
    }
  };

  return (
    <div>
      <h2>Billing</h2>
      <form>
        <select value={examType} onChange={(e) => setExamType(e.target.value)}>
          <option value="">Select Exam Type</option>
          <option value="viva">Viva</option>
          <option value="practical">Practical Exam</option>
        </select>
        <select value={examiner} onChange={(e) => setExaminer(e.target.value)}>
          <option value="">Select Examiner</option>
          <option value="internal">Internal</option>
          <option value="external">External</option>
        </select>
        <input type="number" placeholder="Hours Worked" value={hoursWorked} onChange={(e) => setHoursWorked(e.target.value)} />
        <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button type="button" onClick={handleGenerateReceipt}>Generate Receipt</button>
      </form>
    </div>
  );
};

export default Billing;
