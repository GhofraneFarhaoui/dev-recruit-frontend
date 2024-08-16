import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpeg';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profileType, setProfileType] = useState('dev');
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

  return (
    <div
      style={{
        display: 'flex',
        maxWidth: '1200px',
        margin: '0 auto',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: '20px',
        boxSizing: 'border-box',
        marginTop: '-100px', // Move the content up a bit
      }}
    >
      {/* Header Section */}
      <h2
        style={{
          backgroundColor: '#012150',
          color: 'white',
          padding: '13px',
          textAlign: 'center',
          margin: '0 0 20px 0',
          width: '100%',
          maxWidth: '600px',
          fontSize: '24px',
          borderRadius: '5px',
        }}
      >
        Choisir votre profil
      </h2>

      {/* Logo Section */}
      <div
        style={{
          textAlign: 'center',
          padding: '40px 0',
        }}
      >
        <img src={logo} alt="Logo" style={{ maxWidth: '120px' }} />
      </div>

      {/* Profile Type Section */}
      <div
        style={{
          textAlign: 'center',
          padding: '35px 0',
          fontSize: '18px',
          fontWeight: 'bold',
          fontFamily: 'Arial, sans-serif',
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          maxWidth: '600px',
          flexWrap: 'wrap',
        }}
      >
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

      {/* Input Fields */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
          maxWidth: '600px',
        }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: '15px',
            borderRadius: '5px',
            border: '3px solid #2C415F',
            fontSize: '16px',
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: '15px',
            borderRadius: '5px',
            border: '3px solid #2C415F',
            fontSize: '16px',
          }}
        />
      </div>

      {/* Sign Up Button */}
      <div
        style={{
          textAlign: 'center',
          padding: '20px',
          maxWidth: '600px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
        }}
      >
        <button
          onClick={handleSignUp}
          style={{
            width: '150px',
            padding: '15px',
            backgroundColor: '#012150',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Sign Up
        </button>
        <button
          onClick={() => navigate('/signin')}
          style={{
            width: '150px',
            padding: '15px',
            backgroundColor: '#012150',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default SignUp;
