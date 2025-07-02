import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

function ChatEntry() {
const [friendEmail, setFriendEmail] = useState('');
const [error, setError] = useState('');
const navigate = useNavigate();
const auth = getAuth();

const handleSubmit = async (e) => {
e.preventDefault();
const user = auth.currentUser;
if (!user) return;
try {
  const res = await fetch(`http://localhost:5000/api/chat/verify-friend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userEmail: user.email, friendEmail })
  });
  const data = await res.json();

  if (res.ok) {
    navigate(`/chat/${friendEmail}`);
  } else {
    setError(data.error);
  }
} catch (err) {
  setError('Server error');
}
};

return (
<div>
<h2>Start Chat</h2>
<form onSubmit={handleSubmit}>
<input
type="email"
placeholder="Enter friend's email"
value={friendEmail}
onChange={(e) => setFriendEmail(e.target.value)}
required
/>
<button type="submit">Start Chat</button>
</form>
{error && (
<div>
<p>{error}</p>
<button onClick={() => navigate('/add-friend')}>Add as Friend</button>
</div>
)}
</div>
);
}

export default ChatEntry;
