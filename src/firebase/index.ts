import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC9j30TST3NDMqcJMsXClZphUMiHyBSqmk",
  authDomain: "chatbox-2b70d.firebaseapp.com",
  projectId: "chatbox-2b70d",
  storageBucket: "chatbox-2b70d.appspot.com",
  messagingSenderId: "377270842486",
  appId: "1:377270842486:web:5f31946daa46cf4bd1db57",
  measurementId: "G-JNRPBBT8K5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fbAnalytics = getAnalytics(app);
const fbAuth = getAuth(app);

export { fbAnalytics, fbAuth };
