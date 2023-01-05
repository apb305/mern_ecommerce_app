import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDr33SJ-gb19jhPSHHUiTgBUYReuGVoZQ",
  authDomain: "ecommerce-app-c9a09.firebaseapp.com",
  projectId: "ecommerce-app-c9a09",
  storageBucket: "ecommerce-app-c9a09.appspot.com",
  messagingSenderId: "608289447661",
  appId: "1:608289447661:web:78dea8e3fa38ba5be5f6e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);