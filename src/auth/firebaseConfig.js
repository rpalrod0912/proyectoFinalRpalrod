/*eslint-disable */
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithRedirect,
  sendPasswordResetEmail,
  linkWithPopup,
  getAdditionalUserInfo,
  getRedirectResult,
  sendEmailVerification,
  reauthenticateWithCredential,
  setPersistence,
  browserSessionPersistence,
  updateEmail,
  updatePassword,
  fetchSignInMethodsForEmail,
  GoogleAuthProvider,
  signInWithPopup,
  EmailAuthProvider,
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
const googleProvider = new GoogleAuthProvider();

export {
  app,
  auth,
  googleProvider,
  getAdditionalUserInfo,
  getRedirectResult,
  sendPasswordResetEmail,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  linkWithPopup,
  signInWithRedirect,
  updateEmail,
  sendEmailVerification,
  GoogleAuthProvider,
  updatePassword,
  reauthenticateWithCredential,
  fetchSignInMethodsForEmail,
};
