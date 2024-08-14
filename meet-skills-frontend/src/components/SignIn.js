import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const [devResponse, hirerResponse] = await Promise.all([
        axios.get('http://localhost:3000/dev', {
          params: { username, password }
        }),
        axios.get('http://localhost:3000/hirer', {
          params: { username, password }
        })
      ]);

      const devUser = devResponse.data.find(user => user.username === username && user.password === password);
      const hirerUser = hirerResponse.data.find(user => user.username === username && user.password === password);

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
    <div>
      <h2>Sign In</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
}

export default SignIn;
