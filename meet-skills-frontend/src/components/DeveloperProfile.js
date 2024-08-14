import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DeveloperProfile() {
  const [id, setId] = useState(''); 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [skills, setSkills] = useState([]);
  const [bio, setBio] = useState('');
  const [availability, setAvailability] = useState('immediate');
  useEffect(() => {
    // Retrieve the user ID from local storage
    const userId = localStorage.getItem('userId');
    if (userId) {
      setId(userId);
      // Optionally: Fetch user data to populate the fields
      axios.get(`http://localhost:3000/dev/${userId}`)
        .then(response => {
          const user = response.data;
          setFirstName(user.firstName);
          setLastName(user.lastName);
          setHourlyRate(user.hourlyRate);
          setEmail(user.email);
          setPhone(user.phone);
          setSkills(user.skills);
          setBio(user.biographie); // Fixing the mismatch
          setAvailability(user.disponibilite); // Fixing the mismatch
        })
        .catch(error => console.error(error));
    }
  }, []);
  const handleProfileUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/dev/${id}`, {
        firstName,
        lastName,
        hourlyRate,
        email,
        phone,
        skills,
        bio,
        availability
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Developer Profile</h2>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Hourly rate"
        value={hourlyRate}
        onChange={(e) => setHourlyRate(e.target.value)}
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
      <textarea
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <div>
        <label>Availability:</label>
        <select value={availability} onChange={(e) => setAvailability(e.target.value)}>
          <option value="immediate">Immediate</option>
          <option value="2_weeks">2 weeks</option>
          <option value="5_weeks">5 weeks</option>
        </select>
      </div>
      <button onClick={handleProfileUpdate}>Update Profile</button>
    </div>
  );
}

export default DeveloperProfile;
