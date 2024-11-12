import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './examForm.css'; // Reference the CSS file

const Billing = () => {
  const [examType, setExamType] = useState('');
  const [examID, setExamID] = useState('');
  const [examiner, setExaminer] = useState('');
  const [hoursWorked, setHoursWorked] = useState('');
  const [amount, setAmount] = useState('');
  const [fadeIn, setFadeIn] = useState(false); 
  const ratePerHour = 200;

   // Automatically calculate amount when hoursWorked changes
  useEffect(() => {
    if (hoursWorked) {
      setAmount(hoursWorked * ratePerHour);
    } else {
      setAmount(''); // Clear amount if hoursWorked is empty
    }
  }, [hoursWorked]);

  const handleGenerateReceipt = async () => {
    try {
      await axios.post('http://localhost:5000/api/billing/generate', { examID, examType, examiner, hoursWorked, amount });
      alert('Billing receipt generated successfully');
    } catch (error) {
      console.error("Receipt generation failed");
    }
  };

  // Effect to trigger fade-in after component mounts
  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div 
      className={`billing-container ${fadeIn ? 'fade-in' : ''}`} 
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      <h1 style={{ textAlign: 'center', color: 'white' }}>
          <b>
            <span className="bill">Bill</span>
            <span className="eval">Eval</span>
          </b>
      </h1>
      <h2 style={{ color: 'white' }}>Billing</h2>
      <form>
        <input type="number" placeholder="Exam ID" value={examID} onChange={(e) => setExamID(e.target.value)} required/>
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
        <br></br>
        <button 
          type="button" 
          onClick={handleGenerateReceipt} 
          style={{ backgroundColor: 'white', color: '#0a3732', border: '1px solid black', }}
        >
          <b>Generate Receipt</b>
        </button>
      </form>
    </div>
  );
};

export default Billing;
