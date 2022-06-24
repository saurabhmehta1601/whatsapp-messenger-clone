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
    try {
      const { user } = await loginWithFacebook();
      if (user) {
        await addUserToFirestore(user.uid, {
          displayName: user.displayName,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          threadIds: [],
          status: "Hey there! I am using whatsApp."
        });
        console.log(user);
        alert.success("Logged in successfully .");
        router.push("/thread");
      }
    } catch (error: any) {
      alert.error(error.message);
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
