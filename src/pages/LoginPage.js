import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true); // Toggle between Login and SignUp modes
  const [username, setUsername] = useState(''); // For both login and signup
  const [email, setEmail] = useState(''); // Only for signup
  const [password, setPassword] = useState(''); // For both login and signup
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLoginMode) {
      // Handle Login
      try {
        const response = await axios.post('http://localhost:8080/auth/login', { username, password });

        // Assuming response.data contains the token
        const { token } = response.data;

        // Store both the authToken and username in localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('username', username); // Store the username

        // Navigate to the "about" page after successful login
        navigate('/about');
      } catch (error) {
        setError('Login failed. Please check your username and password.');
      }
    } else {
      // Handle Sign Up
      try {
        await axios.post('http://localhost:8080/auth/sign-up', { username, email, password });
        setSuccess(true); // Show success message after successful signup
        setError(null); // Clear any previous error
        setIsLoginMode(true); // Switch back to login mode after successful signup
      } catch (error) {
        setError('Sign up failed. Please try again.');
      }
    }
  };

  return (
    <div>
      <h1>{isLoginMode ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit}>
        {/* Username is required for both login and signup */}
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {!isLoginMode && (
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={!isLoginMode} // Email is required only in signup mode
            />
          </div>
        )}

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

        <button type="submit">{isLoginMode ? 'Login' : 'Sign Up'}</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Signup successful! You can now log in.</p>}

      <div>
        <p>{isLoginMode ? 'New here?' : 'Already have an account?'}</p>
        <button onClick={() => {
          setIsLoginMode(!isLoginMode);
          setError(null); // Clear any errors when switching modes
        }}>
          {isLoginMode ? 'Sign Up' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
