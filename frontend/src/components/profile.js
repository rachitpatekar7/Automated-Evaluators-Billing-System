import React from 'react';
import './examForm.css'; // Import the CSS file

const Profile = () => {
    return (
        <div className="exam-form-container" style={{ opacity: 1, transform: 'none' }}> {/* Ensure visibility */}
            <h1 style={{ textAlign: 'center' }}>
                <b>
                    <span className="bill">Bill</span>
                    <span className="eval">Eval</span>
                </b>
            </h1>
            <hr style={{ border: 'none', height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.192)', margin: '10px 0' }} />

            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Profile Details</h3>
            <div style={{
                backgroundColor: '#f9f9f9',
                padding: '15px',
                borderRadius: '5px',
                color: '#0a3732',
            }}>
                <p style={{ marginBottom: '10px' }}><strong>Name:</strong> John Doe</p>
                <p style={{ marginBottom: '10px' }}><strong>Email:</strong> john.doe@example.com</p>
                <p style={{ marginBottom: '10px' }}><strong>Password:</strong> ********</p>
                <p style={{ marginBottom: '10px' }}><strong>Role:</strong> User</p>
                <p style={{ marginBottom: '10px' }}><strong>Status:</strong> Active</p>
            </div>
        </div>
    );
};

export default Profile;
