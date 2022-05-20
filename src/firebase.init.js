// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAMHWnDYTQmsXAfyQ8w3QwG8bDKtM4BOqg",
  authDomain: "assignment-12-3ecaa.firebaseapp.com",
  projectId: "assignment-12-3ecaa",
  storageBucket: "assignment-12-3ecaa.appspot.com",
  messagingSenderId: "753441795558",
  appId: "1:753441795558:web:951c4fcfed58470682fa27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;