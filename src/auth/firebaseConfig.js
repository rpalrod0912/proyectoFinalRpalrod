/*eslint-disable */
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  reauthenticateWithCredential,
  setPersistence,
  browserSessionPersistence,
  updateEmail,
  updatePassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCOrCWf9uLTaov3TtM1t2prhQbNuNBeFIg",
  authDomain: "vueclienterpalrod.firebaseapp.com",
  projectId: "vueclienterpalrod",
  storageBucket: "vueclienterpalrod.appspot.com",
  messagingSenderId: "819848707326",
  appId: "1:819848707326:web:1c7f00517e4d95a55039af",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export {
  app,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  fetchSignInMethodsForEmail,
};
