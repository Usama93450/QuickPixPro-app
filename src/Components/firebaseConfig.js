import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
  apiKey: "AIzaSyBwERhZnad7apQ5wrXxya_85UXpkAfJt4E",
  authDomain: "quickpixpro.firebaseapp.com",
  projectId: "quickpixpro",
  storageBucket: "quickpixpro.firebasestorage.app",
  messagingSenderId: "103892711821",
  appId: "1:103892711821:web:bfea0e57b828936848a5c4",
  measurementId: "G-PV3WR7382C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig