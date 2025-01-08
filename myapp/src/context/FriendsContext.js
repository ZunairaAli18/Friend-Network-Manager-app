import React, { createContext, useContext, useState } from 'react';

const FriendsContext = createContext();

export function FriendsProvider({ children }) {
  const [friends, setFriends] = useState([
    { id: 1, name: 'Alex Johnson', username: '@alex', status: 'Active now', mutualFriends: 325 },
    { id: 2, name: 'Sarah Wilson', username: '@sarah', status: 'Last seen 2 hours ago', mutualFriends: 156 },
    { id: 3, name: 'Mike Brown', username: '@mike', status: 'Active now', mutualFriends: 89 },
    { id: 4, name: 'Emma Davis', username: '@emma', status: 'Last seen yesterday', mutualFriends: 234 }
  ]);

  const addFriend = (newFriend) => {
    setFriends(prev => [...prev, { ...newFriend, id: Date.now() }]);
  };

  const removeFriend = (id) => {
    setFriends(prev => prev.filter(friend => friend.id !== id));
  };

  const searchFriends = (query) => {
    return friends.filter(friend =>
      friend.name.toLowerCase().includes(query.toLowerCase()) ||
      friend.username.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <FriendsContext.Provider value={{ friends, addFriend, removeFriend, searchFriends }}>
      {children}
    </FriendsContext.Provider>
  );
}

export function useFriends() {
  const context = useContext(FriendsContext);
  if (!context) {
    throw new Error('useFriends must be used within a FriendsProvider');
  }
  return context;
}