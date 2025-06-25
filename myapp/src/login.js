import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import './login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset before each login attempt

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");

      window.location.href = "/Home";
    } catch (error) {
      console.log(error.message);

      // Friendly error messages
      const errorCode = error.code;
      let friendlyMessage = "Login failed. Please try again.";

      switch (errorCode) {
        case "auth/invalid-email":
          friendlyMessage = "Please enter a valid email address.";
          break;
        case "auth/user-disabled":
          friendlyMessage = "This account has been disabled.";
          break;
        case "auth/user-not-found":
          friendlyMessage = "No account found with this email.";
          break;
        case "auth/wrong-password":
          friendlyMessage = "Incorrect password. Please try again.";
          break;
        case "auth/invalid-credential":
          friendlyMessage = "Invalid login credentials. Please check your email and password.";
          break;
        default:
          friendlyMessage = error.message; 
      }


      setErrorMessage(friendlyMessage);
    }
  };

  return (
    <div className="signup-container">
      <div className="left-section">
        <h1>Find 3D Objects, Mockups and Illustrations here.</h1>
      </div>

      <div className="right-section">
        <h2>Login</h2>

        <div className="divider" />

        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            className="form-input"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="form-input"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="create-account-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
