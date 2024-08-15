import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../assets/logo.jpeg';

function DeveloperProfile() {
  const [userName, setUserName] = useState('');
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
    const userId = localStorage.getItem('userId');
    if (userId) {
      setId(userId);
      axios
        .get(`http://localhost:3000/dev/${userId}`)
        .then((response) => {
          const user = response.data;
          setUserName(user.userName);
          setFirstName(user.firstName);
          setLastName(user.lastName);
          setHourlyRate(user.hourlyRate);
          setEmail(user.email);
          setPhone(user.phone);
          setSkills(user.skills || []); 
          setBio(user.biographie || ''); 
          setAvailability(user.disponibilite || 'immediate');
        })
        .catch((error) => console.error(error));
    }
  }, []);

  const handleProfileUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/dev/${id}`, {
        userName,
        firstName,
        lastName,
        hourlyRate,
        email,
        phone,
        skills,
        bio,
        availability,
      });
      console.log(response.data);
      alert('Profile updated successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header Section */}
      <h2
        style={{
          backgroundColor: '#012150',
          color: 'white',
          padding: '15px',
          textAlign: 'center',
          margin: 0,
        }}
      ></h2>

      {/* Logo Section */}
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <img src={logo} alt="Logo" style={{ maxWidth: '100px' }} />
      </div>

      {/* Navbar Section */}
      <div
        style={{
          display: 'flex',
          backgroundColor: '#012150',
          padding: '10px 0',
        }}
      >
        <div style={{ margin: '0 20px' }}>
          <a
            href="/developer/profile"
            style={{ textDecoration: 'none', color: '#ffff' }}
          >
            Dev Profile
          </a>
        </div>
        <div style={{ margin: '0 20px' }}>
          <a href="/orders" style={{ textDecoration: 'none', color: '#ffff' }}>
            Orders
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {/* Profile Section */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'flex-start',
            marginBottom: '30px',
          }}
        >
          {/* Profile Title */}
          <div style={{ flex: '3' }}>
            <h3 style={{ marginBottom: '10px', color: '#012150' }}>PROFILE</h3>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: '1' }}>
                <img
                  src=""
                  alt="Profile"
                  style={{ maxWidth: '150px', borderRadius: '50%' }}
                />
              </div>
              <div
                style={{
                  flex: '3',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={{
                    width: '50%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                  }}
                />
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
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  style={{
                    width: '50%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div style={{ flex: '2' }}>
            <h3 style={{ marginBottom: '10px', color: '#012150' }}>CONTACT</h3>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '50%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              />
              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  width: '50%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div>
          <h3 style={{ marginBottom: '10px', color: '#012150' }}>SKILLS</h3>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['HTML', 'CSS', 'JS', 'React'].map((skill) => (
              <label
                key={skill}
                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                <input
                  type="radio"
                  name="skills"
                  value={skill}
                  checked={skills.includes(skill)}
                  onChange={(e) => {
                    const selectedSkill = e.target.value;
                    setSkills((prev) =>
                      prev.includes(selectedSkill)
                        ? prev.filter((skill) => skill !== selectedSkill)
                        : [...prev, selectedSkill]
                    );
                  }}
                  style={{ width: '20px', height: '20px' }}
                />
                {skill}
              </label>
            ))}
          </div>
        </div>
        {/* Biography and Availability Section */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '10px', color: '#012150' }}>BIOGRAPHIE</h3>
          <div style={{ display: 'flex', gap: '20px' }}>
            {/* Biography Section */}
            <div style={{ flex: '1' }}>
              <textarea
                placeholder="Biography"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                style={{
                  width: '50%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  height: '150px',
                }}
              />
            </div>
            {/* Availability Section */}
            <div
              style={{
                flex: '1',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                paddingTop: '0.5px',
              }}
            >
              <label
                style={{
                  marginBottom: '10px',
                  color: '#012150',
                  fontWeight: 'bold',
                }}
              >
                DISPONIBILITE:
              </label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                style={{
                  width: '50%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  height: '40px',
                  fontSize: '20px',
                }}
              >
                <option value="immediate">Immediate</option>
                <option value="2_weeks">2 weeks</option>
                <option value="5_weeks">5 weeks</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Update Button */}
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <button
          onClick={handleProfileUpdate}
          style={{
            padding: '15px 30px',
            backgroundColor: '#012150',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}

export default DeveloperProfile;
