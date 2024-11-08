import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './examForm.css';

const Profile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/auth/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
    }, []);

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from local storage
        window.location.href = '/login'; // Redirect to login page
    };

    if (!profile) return <div>Loading...</div>;

    return (
        <div className="exam-form-container" style={{ opacity: 1, transform: 'none' }}>
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
                <p style={{ marginBottom: '10px' }}><strong>Name:</strong> {profile.name}</p>
                <p style={{ marginBottom: '10px' }}><strong>Email:</strong> {profile.email}</p>
                <p style={{ marginBottom: '10px' }}><strong>Subject:</strong> {profile.subject}</p>
                <p style={{ marginBottom: '10px' }}><strong>Qualification:</strong> {profile.qualification}</p>
                <p style={{ marginBottom: '10px' }}><strong>User ID:</strong> {profile.userID}</p>
                <p style={{ marginBottom: '10px' }}><strong>Status:</strong> Active</p>
            </div>

            {/* Logout Button */}
            <button onClick={handleLogout} style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#ff4b4b',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
            }}>
                Logout
            </button>
        </div>
    );
};

export default Profile;
