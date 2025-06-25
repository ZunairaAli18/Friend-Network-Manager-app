import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFriends } from '../context/FriendsContext';
import { getAuth } from "firebase/auth";

function AddFriend() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { addFriend } = useFriends();


const auth = getAuth();
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccessMessage('');
  setIsSubmitting(true);

  const user = auth.currentUser;

  if (!user) {
    setError("User not logged in.");
    return;
  }

  const friendEmail = email.trim();
  if (!friendEmail) {
      setError("Email is required.");
      return;
    }

    if (!isValidEmail(friendEmail)) {
      setIsSubmitting(false);
      setError("Please enter a valid email address.");
      return;
    }
  const friendName = friendEmail.split('@')[0];

  const payload = {
    userEmail: user.email,
    name: friendName,
    email: friendEmail
  };

  console.log("Sending friend data:", payload);

  try {
    const res = await fetch('http://localhost:5000/api/users/add-friend-by-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Failed to add friend");
    setSuccessMessage("Friend added successfully!");
    setEmail('');
   
  } catch (err) {
    setError(err.message);
  } finally {
    setIsSubmitting(false);
  }
};



  return (
    <div>
      <header className="header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <h1>Add Friend</h1>
        <button className="menu-button">×</button>
      </header>
      <div style={{ padding: '20px' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label>email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px'
              }}
            />
            {error && <p style={{ color: 'red', marginTop: '5px' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green', marginTop: '5px' }}>{successMessage}</p>}
          </div>
          <button
            className="button"
            type="submit"
            disabled={isSubmitting || !email.trim()}
          >
            {isSubmitting ? 'Sending...' : 'Send Friend Request'}
          </button>
        </form>
        <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
          You'll be friends once they accept your request
        </p>
      </div>
    </div>
  );
}

export default AddFriend;