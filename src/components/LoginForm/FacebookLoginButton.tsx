import React from "react";
import styles from "./styles.module.scss";
import { loginWithFacebook } from "@Firebase/utils/auth";
import { addUserToFirestore } from "@Firebase/utils/db/CRUD";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";

export const FacebookLoginButton = () => {
  const router = useRouter();
  const alert = useAlert();

  const handleFacebookLogin = async () => {
    const { user } = await loginWithFacebook();
    if (user) {
      await addUserToFirestore(user.uid, {
        displayName: user.displayName,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        threadIds: [],
      });
      console.log(user);
      alert.success("Logged in successfully .");
      router.push("/thread");
    }
  };

  return (
    <button
      className={styles.facebookConnectButton}
      onClick={handleFacebookLogin}
    >
      CONNECT WITH FACEBOOK
    </button>
  );
};
