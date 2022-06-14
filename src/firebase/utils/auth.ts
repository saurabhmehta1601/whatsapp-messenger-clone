import { auth } from "@Firebase/app";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
const provider = new FacebookAuthProvider();

export const loginWithFacebook = () => {
  return signInWithPopup(auth, provider);
};
