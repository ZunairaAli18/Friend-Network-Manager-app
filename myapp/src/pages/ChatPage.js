import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

function ChatPage() {
const { friendEmail } = useParams();
const [messages, setMessages] = useState([]);
const [msg, setMsg] = useState('');
const [userEmail, setUserEmail] = useState(null);
const auth = getAuth();

const fetchMessages = async () => {
const user = auth.currentUser;
if (!user) return;
try{
const res = await fetch(`http://localhost:5000/api/chat/messages?userEmail=${user.email}&friendEmail=${friendEmail}`);
const data = await res.json();
setMessages(data);
}catch (err){
  console.error('Failed to fetch messages', err);
}

};

const sendMessage = async () => {
const user = auth.currentUser;
if (!user || !msg.trim()) return;await fetch('http://localhost:5000/api/chat/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    sender: user.email,
    recipient: friendEmail,
    text: msg
  })
});

setMsg('');
fetchMessages(); // refresh
};

useEffect(() => {
  const user = auth.currentUser;
  if (user) {
    setUserEmail(user.email);
    fetchMessages();
  }
}, []);


return (
<div>
<h2>Chat with {friendEmail}</h2>
<div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
{messages.map((m, i) => (
<div key={i} style={{
textAlign: m.sender === userEmail ? 'right' : 'left',
padding: '5px',
margin: '5px',
backgroundColor: m.sender === userEmail ? '#DCF8C6' : '#F1F0F0',
borderRadius: '10px'
}}>
{m.text}
</div>
))}
</div>
<div>
<input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Type a message" />
<button onClick={sendMessage}>Send</button>
</div>
</div>
);
}

export default ChatPage;