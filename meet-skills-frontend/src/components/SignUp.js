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
    axios
      .post(`http://localhost:3000/${profileType}`, {
        username,
        password,
        profileType,
      })
      .then((response) => {
        console.log(response.data);
        navigate('/signin');
      })
      .catch((error) => {
        console.error(error);
      });
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
      >
        Choisir votre profil
      </h2>

      {/* Logo Section */}
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <img src={logo} alt="Logo" style={{ maxWidth: '150px' }} />
      </div>

      {/* Profile Type Section */}
      <div
        style={{
          textAlign: 'center',
          padding: '20px 0',
          fontSize: '33px',
          fontWeight: 'bold',
          fontFamily: 'Arial, sans-serif',
          display: 'flex',
          justifyContent: 'center',
          margin: '40px',
          gap: '80px',
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
              marginTop: '20px',
              fontWeight: 'revert',
              fontSize: '18px',
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
              marginTop: '20px',
              fontWeight: 'revert',
              fontSize: '18px',
            }}
          >
            Construire une équipe gagnante
          </div>
        </label>
      </div>

      {/* Input Fields */}
      <div
        style={{
          flex: 0.58,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        ,
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '15px',
          }}
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: '250%',
              padding: '15px',
              marginBottom: '15px',
              borderRadius: '5px',
              border: '3px solid #2C415F',
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '250%',
              padding: '15px',
              borderRadius: '5px',
              border: '3px solid #2C415F',
            }}
          />
        </div>
      </div>

      {/* Sign Up Button */}
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <button
          onClick={handleSignUp}
          style={{
            width: '10%',
            padding: '20px 50px',
            backgroundColor: '#012150',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '20px',
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default SignUp;
