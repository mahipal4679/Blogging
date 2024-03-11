// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWAt8DhyPTfoK1xS21fDMnRwrWtbwizUQ",
  authDomain: "my-blogging-app-40a3c.firebaseapp.com",
  projectId: "my-blogging-app-40a3c",
  storageBucket: "my-blogging-app-40a3c.appspot.com",
  messagingSenderId: "617265356400",
  appId: "1:617265356400:web:e9d8661b5aac235a50deb5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);