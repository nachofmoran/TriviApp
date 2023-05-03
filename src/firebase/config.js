import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqQLDsgn48Whgf9QTsm_iHBHelj8Hdj3I",
  authDomain: "trivia-game-58b35.firebaseapp.com",
  projectId: "trivia-game-58b35",
  storageBucket: "trivia-game-58b35.appspot.com",
  messagingSenderId: "477618459800",
  appId: "1:477618459800:web:f661d16a6680a2f1f86ced",
};

initializeApp(firebaseConfig);

const db = getFirestore();

export { db };
