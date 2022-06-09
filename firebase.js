// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
import {REACT_APP_FIREBASE_API} from "@env";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

console.log(REACT_APP_FIREBASE_API);

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API,
  authDomain: "airelocal-auth.firebaseapp.com",
  projectId: "airelocal-auth",
  storageBucket: "airelocal-auth.appspot.com",
  messagingSenderId: "5551741746",
  appId: "1:5551741746:web:ca37cdae568216b5a8152b"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}
const db = firebase.firestore();
const auth = firebase.auth();

export { auth, db};