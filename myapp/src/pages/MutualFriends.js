import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

function MutualFriends() {
  const navigate = useNavigate();
  const [suggested, setSuggested] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user?.email) {
        setUserEmail(user.email);
        try {
          const res = await fetch(`http://localhost:5000/api/users/suggested-friends/${user.email}`);
          const data = await res.json();
          if (res.ok) {
            setSuggested(data.suggestions || []);
          } else {
            console.error('Error fetching suggestions:', data.error);
          }
        } catch (err) {
          console.error('Network error:', err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const filteredSuggestions = suggested.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <header className="header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <h1>Suggested Friends</h1>
      </header>

      <div className="search-bar" style={{ padding: '1rem' }}>
        <input
          type="text"
          placeholder="Search suggestions"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
        />
      </div>

      {filteredSuggestions.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
          {searchQuery ? 'No matches found' : 'No suggestions yet'}
        </p>
      ) : (
        <div style={{ padding: '20px' }}>
          {filteredSuggestions.map(friend => (
            <div key={friend.email} className="friend-item" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 0',
              borderBottom: '1px solid #eee'
            }}>
              <div>
                <div className="friend-name" style={{ fontWeight: 'bold' }}>{friend.name}</div>
                <div className="friend-username">
                  Mutual Friends: {Array.isArray(friend.mutualFriends) ? friend.mutualFriends.join(', ') : 'None'}
                </div>

              </div>
              <button
                style={{
                  marginLeft: '10px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                ⋮
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MutualFriends;
