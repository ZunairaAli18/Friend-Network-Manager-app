import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth  } from "./firebase";
import './login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      window.location.href = "/Home";

    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <div className="signup-container">
      <div className="left-section">
        <h1>Find 3D Objects, Mockups and Illustrations here.</h1>
      </div>
      <div className="right-section">
        <h2>Login</h2>
        
        
        <div className="divider">
        </div>
        
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
          <button type="submit" className="create-account-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;