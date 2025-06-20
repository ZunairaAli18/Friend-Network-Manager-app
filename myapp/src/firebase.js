// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8oo4ImF2uAFXFpFYmzFPz8x6MGmc8UkA",
  authDomain: "friend-connect-b6467.firebaseapp.com",
  projectId: "friend-connect-b6467",
  storageBucket: "friend-connect-b6467.appspot.com",
  messagingSenderId: "808072652446",
  appId: "1:808072652446:web:aa5a6b1899774df4f67d8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const db=getFirestore(app);
export default app;