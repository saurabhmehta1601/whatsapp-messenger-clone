import React from "react";
import styles from "./styles.module.scss";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import { loginWithFacebook } from "@Firebase/utils/auth";
import { addUserToFirestore } from "@Firebase/utils/db";

export const LoginForm = () => {
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
    }
  };
  return (
    <div className={styles.form}>
      <div className={styles.name}>
        <PersonIcon />
        <input type="text" placeholder="Name" />
      </div>
      <div className={styles.telephone}>
        <PhoneIcon />
        <input type="number" placeholder="Telephone" />
      </div>
      <div className={styles.buttonGroup}>
        <button className={styles.confirm}>CONFIRM</button>
        <button
          className={styles.facebookConnect}
          onClick={handleFacebookLogin}
        >
          CONNECT WITH FACEBOOK
        </button>
      </div>
    </div>
  );
};
