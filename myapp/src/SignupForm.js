import './SignupForm.css';
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { db } from './firebase';
import { setDoc, doc } from "firebase/firestore";
import { sendUserToMongo } from "./utils/sendUserToMongo";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          photo:""
        });
          // Send to MongoDB
      await sendUserToMongo({
        name: fname,
        email: user.email,
        friends: []
      });
      console.log("User Registered Successfully!!");
      }
      
      
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
        <h2>Create Account</h2>
        
        <button className="social-button google-button">
          <img src="/placeholder.webp" alt="Google icon" className="social-icon" />
          Sign up with Google
        </button>
        
        
        <div className="divider">
          <span>OR</span>
        </div>
        
        <form className="signup-form" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            className="form-input"
            onChange={(e) => setFname(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="create-account-button">
            Create Account
          </button>
        </form>
        
        <p className="login-text">
          Already have an account? 
          <a href="/login" className="login-link"> Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;