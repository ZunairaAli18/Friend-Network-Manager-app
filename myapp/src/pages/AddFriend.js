import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFriends } from '../context/FriendsContext';
import { getAuth } from "firebase/auth";

function AddFriend() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { addFriend } = useFriends();


const auth = getAuth();

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setIsSubmitting(true);

  const user = auth.currentUser;

  if (!user) {
    setError("User not logged in.");
    setIsSubmitting(false);
    return;
  }

  try {
    const idToken = await user.getIdToken(); // Firebase auth token
    const userId = user.uid;

    const res = await fetch(`http://localhost:5000/users/${userId}/add-friend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        name: email.split('@')[0],
        email: email
      }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Failed to add friend");

    addFriend({
      name: data.friend.name,
      username: "@" + data.friend.name.toLowerCase(),
      status: 'Pending request',
      mutualFriends: 0
    });

    navigate('/friends');
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
            <label>Username or email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter username or email"
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px'
              }}
            />
            {error && <p style={{ color: 'red', marginTop: '5px' }}>{error}</p>}
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