import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpeg';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profileType, setProfileType] = useState('dev');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (username && password) {
      axios
        .post(`http://localhost:3000/${profileType}`, {
          username,
          password,
          profileType,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.username && response.data.password) {
            navigate('/signin');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert('Please fill in the username and password fields');
    }
  };

  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    padding: '10px',
    boxSizing: 'border-box',
    maxWidth: '100%',
    margin: '0 auto',
    textAlign: 'center',
    backgroundColor: '#f4f4f4',
  };

  const headerStyle = {
    backgroundColor: '#012150',
    color: 'white',
    padding: '10px',
    textAlign: 'center',
    width: '100%',
    maxWidth: '600px',
    fontSize: windowWidth < 768 ? '20px' : '24px',
    borderRadius: '5px',
    marginBottom: '10px',
  };

  const profileTypeContainerStyle = {
    textAlign: 'center',
    padding: '35px 0',
    fontSize: windowWidth < 768 ? '16px' : '18px', // Responsive font size
    fontWeight: 'bold',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    maxWidth: '600px',
    flexWrap: 'wrap',
    marginBottom: '20px', // Add margin to separate from input fields
  };

  const inputStyle = {
    width: '100%',
    maxWidth: '400px',
    padding: '15px',
    borderRadius: '5px',
    border: '3px solid #2C415F',
    fontSize: '16px',
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: windowWidth < 768 ? 'column' : 'row', // Stack buttons vertically on smaller screens
    gap: '10px',
    maxWidth: '600px',
    width: '100%',
    justifyContent: 'center',
  };

  const buttonStyle = {
    width: windowWidth < 768 ? '100%' : '150px',
    padding: '15px',
    backgroundColor: '#012150',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginBottom: windowWidth < 768 ? '10px' : '0', // Space between buttons on small screens
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Choisir votre profil</h2>
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <img src={logo} alt="Logo" style={{ maxWidth: '120px' }} />
      </div>
      <div style={profileTypeContainerStyle}>
        <label style={{ textAlign: 'center', color: '#23406B' }}>
          <input
            type="radio"
            value="dev"
            checked={profileType === 'dev'}
            onChange={(e) => setProfileType(e.target.value)}
            style={{ width: '20px', height: '20px', marginRight: '10px' }}
          />
          Developpeur
          <div
            style={{
              color: '#2C415F',
              marginTop: '10px',
              fontWeight: 'normal',
              fontSize: '14px',
            }}
          >
            Donner de la visibilité à votre talent
          </div>
        </label>
        <label style={{ textAlign: 'center', color: '#23406B' }}>
          <input
            type="radio"
            value="hirer"
            checked={profileType === 'hirer'}
            onChange={(e) => setProfileType(e.target.value)}
            style={{ width: '20px', height: '20px', marginRight: '10px' }}
          />
          Recruteur
          <div
            style={{
              color: '#2C415F',
              marginTop: '10px',
              fontWeight: 'normal',
              fontSize: '14px',
            }}
          >
            Construire une équipe gagnante
          </div>
        </label>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
          maxWidth: '600px',
          marginBottom: '20px',
        }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div style={buttonContainerStyle}>
        <button onClick={handleSignUp} style={buttonStyle}>
          Sign Up
        </button>
        <button onClick={() => navigate('/signin')} style={buttonStyle}>
          Sign In
        </button>
      </div>
    </div>
  );
}

export default SignUp;
