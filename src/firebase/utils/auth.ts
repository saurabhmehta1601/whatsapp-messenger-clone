import { auth } from "@Firebase/app";
import { FacebookAuthProvider, signInWithPopup, signOut } from "firebase/auth";
const provider = new FacebookAuthProvider();

export const loginWithFacebook = () => {
  return signInWithPopup(auth, provider);
};

// SIGNOUT
export const signOutUser = () => {
  return signOut(auth)
}