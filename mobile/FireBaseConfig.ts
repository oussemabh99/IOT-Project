import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBUuf2vYC6RJRBYZVXjqCEAgXG7t2oR7go",
  authDomain: "testapp-f4189.firebaseapp.com",
  databaseURL: "https://testapp-f4189-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "testapp-f4189",
  storageBucket: "testapp-f4189.firebasestorage.app",
  messagingSenderId: "213631782298",
  appId: "1:213631782298:web:83a6d6c4bcd5c059a8fe23",
  measurementId: "G-559CBLQ75C",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
