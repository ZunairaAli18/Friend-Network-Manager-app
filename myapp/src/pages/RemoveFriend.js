import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFriends } from '../context/FriendsContext';

function RemoveFriend() {
  const navigate = useNavigate();
  const { friends, removeFriend, searchFriends } = useFriends();
  const [searchQuery, setSearchQuery] = useState('');
  const [removingId, setRemovingId] = useState(null);
  
  const filteredFriends = searchQuery ? searchFriends(searchQuery) : friends;

  const handleRemove = async (id) => {
    setRemovingId(id);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      removeFriend(id);
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div>
      <header className="header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <h1>Remove Friend</h1>
        <button className="menu-button">×</button>
      </header>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search friends" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {filteredFriends.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
          {searchQuery ? 'No friends found' : 'No friends to remove'}
        </p>
      ) : (
        <ul className="friend-list">
          {filteredFriends.map(friend => (
            <li key={friend.id} className="friend-item">
              <div className="friend-info">
                <div className="friend-name">{friend.name}</div>
                <div className="friend-username">{friend.username}</div>
              </div>
              <button 
                onClick={() => handleRemove(friend.id)}
                disabled={removingId === friend.id}
                style={{
                  padding: '8px 16px',
                  background: 'white',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  opacity: removingId === friend.id ? 0.7 : 1
                }}
              >
                {removingId === friend.id ? 'Removing...' : 'Remove'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RemoveFriend;