import { getAuth } from "firebase/auth";

// utils/sendUserToMongo.js
export const sendUserToMongo = async (userData) => {
  try {
    const res = await fetch('http://localhost:5000/customer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const data = await res.json();
    console.log("Mongo response:", data);
  } catch (err) {
    console.error("MongoDB error:", err);
  }
};

