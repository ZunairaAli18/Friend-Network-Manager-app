import React from 'react';
import './login.css';

const Login = () => {
  return (
    <div className="signup-container">
      <div className="left-section">
        <h1>Find 3D Objects, Mockups and Illustrations here.</h1>
      </div>
      <div className="right-section">
        <h2>Login</h2>
        
        <button className="social-button google-button">
          <img src="/placeholder.svg" alt="Google icon" className="social-icon" />
          Sign up with Google
        </button>
        
        <button className="social-button facebook-button">
          <img src="/placeholder.svg" alt="Facebook icon" className="social-icon" />
          Sign up with Facebook
        </button>
        
        <div className="divider">
          <span>OR</span>
        </div>
        
        <form className="signup-form">
          <input
            type="text"
            placeholder="Full Name"
            className="form-input"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="form-input"
          />
          <input
            type="password"
            placeholder="Password"
            className="form-input"
          />
          <button type="submit" className="create-account-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;