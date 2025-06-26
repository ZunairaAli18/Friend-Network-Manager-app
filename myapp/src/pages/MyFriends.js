import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function MyFriends() {
const [friends, setFriends] = useState([]);
const [loading, setLoading] = useState(true);
const auth = getAuth();
const navigate = useNavigate();

useEffect(() => {
const fetchFriends = async () => {
const user = auth.currentUser;
if (!user) return;
  try {
    const res = await fetch(`http://localhost:5000/api/users/get-friends/${user.email}`);
    const data = await res.json();
    if (res.ok) {
      setFriends(data.friends);
    } else {
      console.error(data.error);
    }
  } catch (err) {
    console.error("Error fetching friends:", err);
  } finally {
    setLoading(false);
  }
};

fetchFriends();
}, []);

return (
<div>
<header className="header">
<button className="back-button" onClick={() => navigate(-1)}>←</button>
<h1>My Friends</h1>
<button className="menu-button">☰</button>
</header>
  {loading ? (
    <p style={{ textAlign: 'center', marginTop: '20px' }}>Loading...</p>
  ) : friends.length === 0 ? (
    <p style={{ textAlign: 'center', marginTop: '20px' }}>You have no friends yet 😢</p>
  ) : (
    <ul className="friend-list">
      {friends.map((friend, index) => (
        <li key={index} className="friend-item">
          <div className="friend-avatar" />
          <div className="friend-info">
            <div className="friend-name">{friend.name}</div>
            <div className="friend-username">{friend.email}</div>
          </div>
        </li>
      ))}
    </ul>
  )}
</div>
);
}

export default MyFriends;
