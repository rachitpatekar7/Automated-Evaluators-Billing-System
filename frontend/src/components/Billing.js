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
  const [exams, setExams] = useState([]);
  const ratePerHour = 200;

  // Fetch exams when component mounts
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const token = localStorage.getItem('token'); // Include token if needed
        const response = await axios.get('http://localhost:5000/api/exam/all-exams', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExams(response.data); // Populate exams state with response data
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };
    fetchExams();
  }, []);

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
    const token = localStorage.getItem('token'); // Retrieve token from local storage

    // Make the request to generate the receipt and set responseType to 'blob' to handle binary data
    const response = await axios.post(
      'http://localhost:5000/api/billing/generate',
      { examID, examType, examiner, hoursWorked, amount },
      {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob', // This is important to handle PDF data
      }
    );

    // Create a URL for the PDF blob and trigger download
    const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Create a temporary link element and click it to trigger the download
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.setAttribute('download', `BillingReceipt-${examID}.pdf`);
    document.body.appendChild(link);
    link.click();

    // Clean up the URL object and remove the temporary link
    URL.revokeObjectURL(pdfUrl);
    link.remove();

    alert('Billing receipt generated and downloaded successfully');
  } catch (error) {
    console.error("Receipt generation failed:", error);
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
        {/* Dropdown for Exam ID */}
        <select
          value={examID}
          onChange={(e) => {
            const selectedExam = exams.find(exam => exam.examID === e.target.value);
            setExamID(e.target.value);
            if (selectedExam) {
              setExamType(selectedExam.examType); // Autofill examType
              setExaminer(selectedExam.examiner); // Autofill examiner
            }
          }}
          required
        >
          <option value="">Select Exam ID</option>
          {exams.map((exam) => (
            <option key={exam.examID} value={exam.examID}>
              {exam.examID}
            </option>
          ))}
        </select>

        {/* Auto-filled Exam Type and Examiner */}
        <input type="text" placeholder="Exam Type" value={examType} readOnly />
        <input type="text" placeholder="Examiner" value={examiner} readOnly />

        {/* Input for Hours Worked and calculated Amount */}
        <input
          type="number"
          placeholder="Hours Worked"
          value={hoursWorked}
          onChange={(e) => setHoursWorked(e.target.value)}
          required
        />
        <input type="number" placeholder="Amount" value={amount} readOnly />

        <br />
        <button 
          type="button" 
          onClick={handleGenerateReceipt} 
          style={{ backgroundColor: 'white', color: '#0a3732', border: '1px solid black' }}
        >
          <b>Generate Receipt</b>
        </button>
      </form>
    </div>
  );
};

export default Billing;