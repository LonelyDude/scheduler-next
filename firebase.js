// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATiJEfDnC61-zeAU7hlTGUvU6feQVOm-I",
  authDomain: "scheduler-38a9e.firebaseapp.com",
  projectId: "scheduler-38a9e",
  storageBucket: "scheduler-38a9e.appspot.com",
  messagingSenderId: "483806147806",
  appId: "1:483806147806:web:fa054aeeeb2a20cdaefe4f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export{provider, auth, db};