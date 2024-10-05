import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true); // Manage login/signup mode
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Only used for signup
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoginMode) {
      // Handle Login
      try {
        const response = await axios.post('/api/login', { email, password });
        localStorage.setItem('authToken', response.data.token);
        navigate('/about');
      } catch (error) {
        console.error('Login failed', error);
      }
    } else {
      // Handle Sign Up
      try {
        await axios.post('/api/signup', { name, email, password });
        alert('Signup successful! You can now log in.');
        setIsLoginMode(true); // Switch back to login mode
      } catch (error) {
        console.error('Signup failed', error);
      }
    }
  };

  return (
    <div>
      <h1>{isLoginMode ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit}>
        {!isLoginMode && (
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">
          {isLoginMode ? 'Login' : 'Sign Up'}
        </button>
      </form>

      <div>
        <p>{isLoginMode ? 'New here?' : 'Already have an account?'}</p>
        <button onClick={() => setIsLoginMode(!isLoginMode)}>
          {isLoginMode ? 'Sign Up' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
