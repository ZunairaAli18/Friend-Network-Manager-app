import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

function RemoveFriend() {
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [removingEmail, setRemovingEmail] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

useEffect(() => {
  const auth = getAuth();
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if (user?.email) {
      setUserEmail(user.email); 

      try {
        console.log("Fetching friends for", user.email);
        const res = await fetch(`http://localhost:5000/api/users/friends/${user.email}`);
        const data = await res.json();
        console.log("Response from server:", res.status, data);
        if (res.ok) {
          setFriends(data.friends || []);
        } else {
          console.error('Error from backend:', data.error);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      }
    }
  });
  return () => unsubscribe();
}, []);


  const handleRemove = async (friendEmail) => {
    setRemovingEmail(friendEmail);
    try {
      const res = await fetch('http://localhost:5000/api/users/remove-friend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail, friendEmail })
      });

      const data = await res.json();

      if (res.ok) {
        setFriends(prev => prev.filter(friend => friend.email !== friendEmail));
      } else {
        console.error('Failed to remove friend:', data.error);
      }
    } catch (err) {
      console.error('Error:', err.message);
    } finally {
      setRemovingEmail(null);
    }
  };

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <header className="header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <h1>Remove Friend</h1>
        <button className="menu-button">×</button>
      </header>

      <div className="search-bar" style={{ padding: '1rem' }}>
        <input 
          type="text" 
          placeholder="Search friends" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
        />
      </div>

      {filteredFriends.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
          {searchQuery ? 'No friends found' : 'No friends aaaaaaa to remove'}
        </p>

      ) : (
        
        <ul className="friend-list" style={{ listStyle: 'none', padding: 0 }}>
          {filteredFriends.map(friend => (
            <li key={friend.email} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '10px 20px',
              borderBottom: '1px solid #eee'
            }}>
              <div>
                <div style={{ fontWeight: 'bold' }}>{friend.name}</div>
                <div style={{ color: '#555' }}>{friend.email}</div>
              </div>
              <button 
                onClick={() => handleRemove(friend.email)}
                disabled={removingEmail === friend.email}
                style={{
                  padding: '8px 16px',
                  background: 'white',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  opacity: removingEmail === friend.email ? 0.6 : 1
                }}
              >
                {removingEmail === friend.email ? 'Removing...' : 'Remove'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RemoveFriend;
