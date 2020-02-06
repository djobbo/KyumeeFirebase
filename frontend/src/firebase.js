import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDHD6TJtE0Lge-hCTMersyUfOey7tIvDvY",
  authDomain: "rankxtest.firebaseapp.com",
  databaseURL: "https://rankxtest.firebaseio.com",
  projectId: "rankxtest",
  storageBucket: "rankxtest.appspot.com",
  messagingSenderId: "1087879678989",
  appId: "1:1087879678989:web:2bf626c5dd9d47b8949944",
  measurementId: "G-RDXKCP5BKY"
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();