// utils/sendTokenToBackend.js
import { auth } from '../firebase';
import axios from 'axios';

const sendTokenToBackend = async () => {
  const user = auth.currentUser;
  if (!user) return;

  const idToken = await user.getIdToken();

  const res = await axios.get(`http://localhost:5000/api/users/email/${user.email}`,{
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  console.log('Mongo user ID:', res.data.user._id);

  // Optional: store user ID locally
  localStorage.setItem('mongoUserId', res.data.user._id);

  return res.data.user;
};

export default sendTokenToBackend;
