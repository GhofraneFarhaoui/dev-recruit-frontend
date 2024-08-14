import React, { useState } from 'react';
import axios from 'axios';

function HirerProfile() {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [skills, setSkills] = useState([]);

  const handleProfileUpdate = async () => {
    try {
      const response = await axios.put('http://localhost:3000/hirer/profile', {
        companyName,
        email,
        phone,
        skills
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Hirer Profile</h2>
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
      <button onClick={handleProfileUpdate}>Update Profile</button>
    </div>
  );
}

export default HirerProfile;
