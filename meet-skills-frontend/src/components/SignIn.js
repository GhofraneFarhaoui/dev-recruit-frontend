import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpeg';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const [devResponse, hirerResponse] = await Promise.all([
        axios.get('http://localhost:3000/dev', {
          params: { username, password },
        }),
        axios.get('http://localhost:3000/hirer', {
          params: { username, password },
        }),
      ]);

      const devUser = devResponse.data.find(
        (user) => user.username === username && user.password === password
      );
      const hirerUser = hirerResponse.data.find(
        (user) => user.username === username && user.password === password
      );

      if (devUser) {
        if (devUser.profileType === 'dev') {
          localStorage.setItem('userId', devUser.id);
          navigate('/developer/profile');
        } else {
          console.error('Invalid profile type for developer');
        }
      } else if (hirerUser) {
        if (hirerUser.profileType === 'hirer') {
          navigate('/hirer/profile');
        } else {
          console.error('Invalid profile type for hirer');
        }
      } else {
        console.error('Invalid credentials');
      }
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
      >
        Login
      </h2>

      {/* Logo Section */}
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <img src={logo} alt="Logo" style={{ maxWidth: '150px' }} />
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

      {/* Sign In Button */}
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <button
          onClick={handleSignIn}
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
          Valider
        </button>
      </div>
    </div>
  );
}

export default SignIn;
