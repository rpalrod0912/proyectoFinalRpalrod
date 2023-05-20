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
  sendSignInLinkToEmail,
  getRedirectResult,
  sendEmailVerification,
  isSignInWithEmailLink,
  reauthenticateWithCredential,
  setPersistence,
  browserSessionPersistence,
  updateEmail,
  updatePassword,
  signInWithEmailLink,
  signInWithPhoneNumber,
  fetchSignInMethodsForEmail,
  GoogleAuthProvider,
  RecaptchaVerifier,
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

//actionCodeSetting needed for email link logIn
const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: "http://localhost:8081/",
  // This must be true.
  handleCodeInApp: true,

  // dynamicLinkDomain: "http://localhost:8081/",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

export {
  app,
  auth,
  googleProvider,
  getAdditionalUserInfo,
  sendSignInLinkToEmail,
  getRedirectResult,
  sendPasswordResetEmail,
  signInWithEmailLink,
  signInWithPopup,
  createUserWithEmailAndPassword,
  actionCodeSettings,
  signInWithEmailAndPassword,
  signOut,
  linkWithPopup,
  isSignInWithEmailLink,
  signInWithRedirect,
  updateEmail,
  RecaptchaVerifier,
  sendEmailVerification,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  updatePassword,
  reauthenticateWithCredential,
  fetchSignInMethodsForEmail,
};
