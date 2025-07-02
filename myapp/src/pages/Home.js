import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <header className="home-header">
        <h1>Hi there!</h1>
        <button className="menu-button">☰</button>
      </header>
      <div style={{ padding: '20px' }}>
        <h2 className="home-subtitle">Nice to meet you!</h2>
        <h3 className="home-section-title">Here's what you can do</h3>
        <div className="home-links">
          <Link to="/add-friend" className="home-link">Add friend</Link>
          <Link to="/remove-friend" className="home-link">Remove a friend</Link>
          <Link to="/my-friends" className="home-link">My friends</Link>
          <Link to="/mutual-friends" className="home-link">Suggest new friends</Link>
          <Link to="/chat-entry">Chat with friends</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;