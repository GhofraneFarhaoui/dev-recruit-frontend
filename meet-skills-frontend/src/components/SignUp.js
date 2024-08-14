import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profileType, setProfileType] = useState('dev');
  const navigate = useNavigate();
  const handleSignUp = () => {
    axios.post(`http://localhost:3000/${profileType}`, {
      username,
      password,
      profileType
    }).then(response => {
      console.log(response.data);
      navigate('/developer/profile'); 
    }).catch(error => {
      console.error(error);
    });
  };

  return (
    <div>
      <h2>Sign Up</h2>
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
      <select value={profileType} onChange={(e) => setProfileType(e.target.value)}>
        <option value="dev">Developer</option>
        <option value="hirer">Hirer</option>
      </select>
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}

export default SignUp;
