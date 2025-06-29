import './SignupForm.css';
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { sendUserToMongo } from "./utils/sendUserToMongo";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (user) {
        await sendUserToMongo({
          name: fname,
          email: user.email,
          friends: []
        });

 /*     await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          photo: ""
        });*/

        console.log("User Registered Successfully!!");
        window.location.href = "/Home";
      }
    } catch (error) {
      const errorCode = error.code;
      let friendlyMessage = "Registration failed. Please try again.";

      switch (errorCode) {
        case "auth/email-already-in-use":
          friendlyMessage = "This email is already in use. Please try logging in.";
          break;
        case "auth/invalid-email":
          friendlyMessage = "Please enter a valid email address.";
          break;
        case "auth/weak-password":
          friendlyMessage = "Password is too weak. Please use at least 6 characters.";
          break;
        case "auth/missing-password":
          friendlyMessage = "Please enter a password.";
          break;
        default:
          friendlyMessage = error.message; // fallback to Firebase message
      }

      setErrorMessage(friendlyMessage);
    }
  };

  return (
    <div className="signup-container">
      <div className="left-section">
        <div>
          <h1>Friend Connect</h1>
          <p className="tagline">Connect, Chat, manage and find new friends.</p>
        </div>
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
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {errorMessage && <p className="error-message">{errorMessage}</p>}

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

export default SignupForm;
