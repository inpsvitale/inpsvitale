import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCgK9cHVcaIlYQriPYzO9x_UWjZEpDs17w",
    authDomain: "inpsvitale-1b1bf.firebaseapp.com",
    projectId: "inpsvitale-1b1bf",
    storageBucket: "inpsvitale-1b1bf.firebasestorage.app",
    messagingSenderId: "1078528600289",
    appId: "1:1078528600289:web:4ae76f5835023e5a652fa0"
};

export const app = initializeApp({
  apiKey: "API_KEY",
  authDomain: "PROJECT.firebaseapp.com",
  projectId: "PROJECT_ID"
});

export const db = getFirestore(app);
export const auth = getAuth(app);
