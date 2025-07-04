

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Friends from './pages/Friends';
import AddFriend from './pages/AddFriend';
import RemoveFriend from './pages/RemoveFriend';
import MutualFriends from './pages/MutualFriends';
import { FriendsProvider } from './context/FriendsContext';
import SignupForm from './SignupForm';
import Login from './login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import MyFriends from './pages/MyFriends';
import ChatEntry from './pages/ChatEntry';
import ChatPage from './pages/ChatPage';

function App() {


  return (
    <FriendsProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<SignupForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/add-friend" element={<AddFriend/>}/>
            <Route path="/remove-friend" element={<RemoveFriend />} />
            <Route path="/mutual-friends" element={<MutualFriends />} />
            <Route path="/my-friends" element={<MyFriends />} />
            <Route path="/chat-entry" element={<ChatEntry />} />
            <Route path="/chat/:friendEmail" element={<ChatPage />} />
          </Routes>
        </div>
      </Router>
    </FriendsProvider>
  );
}

export default App;
