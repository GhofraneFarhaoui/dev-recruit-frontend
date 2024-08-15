import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HirerProfile() {
  const [id, setId] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businesses, setBusinesses] = useState([]);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState(''); // Add password state

  const businessOptions = [
    "Automobile",
    "Electronic",
    "Finance",
    "Marketing",
    "Insurance",
    "Information Technology"
  ];

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setId(userId);
      axios.get(`http://localhost:3000/hirer/${userId}`)
        .then(response => {
          const user = response.data;
          setUserName(user.userName);
          setCompanyName(user.companyName);
          setEmail(user.email);
          setPhone(user.phone);
          setBusinesses(user.businesses || []);
        })
        .catch(error => {
          console.error('Error fetching hirer profile:', error);
          if (error.response && error.response.status === 404) {
            console.error('Profile not found');
          }
        });
    } else {
      console.error('User ID not found in localStorage');
    }
  }, []);

  const handleCheckboxChange = (business) => {
    setBusinesses(prev =>
      prev.includes(business)
        ? prev.filter(b => b !== business)
        : [...prev, business]
    );
  };

  const handleProfileUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/hirer/${id}`, {
        userName,
        companyName,
        email,
        phone,
        businesses,
        password // Include password in the update
      });
      console.log('Profile updated:', response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.response && error.response.status === 404) {
        console.error('Profile not found');
      }
    }
  };

  return (
    <div>
      <h2>Hirer Profile</h2>
      <input
        type="text"
        placeholder="User Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        style={{
          width: '50%',
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />
      <input
        type="text"
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="password" // Add password input field
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: '50%',
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />
      <div>
        <label>Businesses:</label>
        {businessOptions.map(business => (
          <div key={business}>
            <input
              type="checkbox"
              checked={businesses.includes(business)}
              onChange={() => handleCheckboxChange(business)}
            />
            <label>{business}</label>
          </div>
        ))}
      </div>
      <button onClick={handleProfileUpdate}>Update Profile</button>
    </div>
  );
}

export default HirerProfile;
