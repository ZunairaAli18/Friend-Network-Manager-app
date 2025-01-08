import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFriends } from '../context/FriendsContext';

function MutualFriends() {
  const navigate = useNavigate();
  const { friends, searchFriends } = useFriends();
  const [searchQuery, setSearchQuery] = useState('');
  
  const currentUser = {
    name: 'Alex Johnson',
    username: '@alex',
    totalFriends: 325
  };

  const filteredFriends = searchQuery 
    ? searchFriends(searchQuery)
    : friends.filter(friend => friend.mutualFriends > 0);

  return (
    <div>
      <header className="header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <h1>Mutual Friends</h1>
      </header>
      <div className="profile-section" style={{ padding: '20px', backgroundColor: 'var(--primary-color)', color: 'white' }}>
        <div className="friend-avatar" style={{ margin: '0 auto 15px auto' }}></div>
        <h2 style={{ textAlign: 'center' }}>{currentUser.name}</h2>
        <p style={{ textAlign: 'center' }}>{currentUser.username} • {currentUser.totalFriends} friends</p>
      </div>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search mutual friends" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {filteredFriends.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
          {searchQuery ? 'No mutual friends found' : 'No mutual friends yet'}
        </p>
      ) : (
        <div style={{ padding: '20px' }}>
          {filteredFriends.map(friend => (
            <div key={friend.id} className="friend-item">
              <div className="friend-avatar"></div>
              <div className="friend-info">
                <div className="friend-name">{friend.name}</div>
                <div className="friend-username">
                  {friend.username} • {friend.mutualFriends} mutual friends
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

export default MutualFriends;