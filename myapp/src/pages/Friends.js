import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFriends } from '../context/FriendsContext';

function Friends() {
  const navigate = useNavigate();
  const { friends, searchFriends } = useFriends();
  const [searchQuery, setSearchQuery] = useState('');
  const filteredFriends = searchQuery ? searchFriends(searchQuery) : friends;

  return (
    <div>
      <header className="header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <h1>Friends</h1>
        <button className="menu-button">☰</button>
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
          {searchQuery ? 'No friends found' : 'No friends yet'}
        </p>
      ) : (
        <ul className="friend-list">
          {filteredFriends.map(friend => (
            <li key={friend.id} className="friend-item">
              <div className="friend-avatar"></div>
              <div className="friend-info">
                <div className="friend-name">{friend.name}</div>
                <div className="friend-username">{friend.username} • {friend.status}</div>
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Friends;

