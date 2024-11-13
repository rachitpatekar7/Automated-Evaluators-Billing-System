import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './examForm.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    qualification: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response.data);
        setProfile(response.data);
        setFormData({
          name: response.data.name,
          subject: response.data.subject,
          qualification: response.data.qualification
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setMessage('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: profile.name,
      subject: profile.subject,
      qualification: profile.qualification
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:5000/api/auth/profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(response.data); // Update profile with new data
      setMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile');
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="exam-form-container" style={{ opacity: 1, transform: 'none', marginTop: '300px',marginBottom: '100px' }}> {/* Add top margin */}
      <h1 style={{ textAlign: 'center' }}>
        <b>
          <span className="bill">Bill</span>
          <span className="eval">Eval</span>
        </b>
      </h1>
      <hr style={{ border: 'none', height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.192)', margin: '10px 0' }} />

      <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Profile</h3>
      <div style={{
          backgroundColor: '#f9f9f9',
          padding: '15px',
          borderRadius: '5px',
          color: '#0a3732',
      }}>
        {isEditing ? (
          <>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
            />
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
            />
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              placeholder="Qualification"
            />
            <div style={{ marginTop: '10px' }}>
              <button onClick={handleSave} style={{ marginRight: '10px' }}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Subject:</strong> {profile.subject}</p>
            <p><strong>Qualification:</strong> {profile.qualification}</p>
            <button onClick={handleEdit} style={{ marginTop: '10px' }}>Edit Profile</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
