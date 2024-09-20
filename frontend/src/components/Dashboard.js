import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="main-content">
      <h2 className="dashboard-header">Hello, (name of user)!</h2>
      <p>Your current billing summary and activity.</p>

      {/* Summary Cards */}
      <div className="cards">
        <div className="card">
          <h3>Today's Revenue</h3>
          <p><span style={{ color: 'green' }}>+10%</span> compared to yesterday</p>
        </div>
        <div className="card">
          <h3>Today's Expenses</h3>
          <p><span style={{ color: 'red' }}>-6%</span> compared to yesterday</p>
        </div>
        <div className="card">
          <h3>Overdue Invoices</h3>
          <p><span style={{ color: 'orange' }}>2 New</span></p>
        </div>
        <div className="card">
          <h3>Upcoming Payments</h3>
          <p><span style={{ color: 'green' }}>9 New</span></p>
        </div>
      </div>

      {/* Exam and Billing Section */}
      <div className="bills-list">
        <h3>Bills</h3>
        <p>No new bills to display.</p>
      </div>

      <div className="recent-transactions">
        <h3>Recent Transactions</h3>
        <p>No recent transactions.</p>
      </div>

      {/* Exam Form Link */}
      <div>
        <h3>Select Exam and Examiner</h3>
        <p>Manage exam details and create billing receipts for each session.</p>
        <Link to="/exam-form">
          <button className="primary-button">Go to Exam Form</button>
        </Link>
      </div>

      {/* Billing Link */}
      <div style={{ marginTop: '20px' }}>
        <h3>Billing Section</h3>
        <p>Generate your billing receipts based on the hours worked and examiner type.</p>
        <Link to="/billing">
          <button className="primary-button">Go to Billing Section</button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
