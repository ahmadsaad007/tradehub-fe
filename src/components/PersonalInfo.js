import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PersonalInfo = () => {
  const [info, setInfo] = useState({ name: '', email: '', phone: '' });
  const [editMode, setEditMode] = useState(false);

  // Retrieve username from localStorage (assuming it's stored there after login)
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        // Make the GET request using the username
        const response = await axios.get(`http://localhost:8080/profile/about/${username}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        });
        setInfo(response.data);
      } catch (error) {
        console.error('Error fetching personal info:', error);
      }
    };

    fetchPersonalInfo();
  }, [username]);

  const handleSave = async () => {
    try {
      // Make the PUT request to update user info
      await axios.put(`http://localhost:8080/profile/update`, info, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      });
      setEditMode(false);
    } catch (error) {
      console.error('Error updating personal info:', error);
    }
  };

  return (
    <div>
      <h2>Personal Information</h2>
      {editMode ? (
        <div>
          <label>Name: <input value={info.name} onChange={(e) => setInfo({ ...info, name: e.target.value })} /></label>
          <label>Email: <input value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })} /></label>
          <label>Phone: <input value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} /></label>
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <p>Name: {info.name}</p>
          <p>Email: {info.email}</p>
          <p>Phone: {info.phone}</p>
          <button onClick={() => setEditMode(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
