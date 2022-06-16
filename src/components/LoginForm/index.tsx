import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import { loginWithFacebook } from "@Firebase/utils/auth";
import { addUserToFirestore } from "@Firebase/utils/db";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "@Firebase/app";

export const LoginForm = () => {
  const [RC, setRC] = useState<any>(null);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState("+91");

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

  const handlePhoneLogin = async () => {
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      RC
    );
    setConfirmationResult(confirmationResult);
    console.log("confirmationResult", confirmationResult);
  };

  useEffect(() => {
    const recaptcha = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response: any) => {
          console.log("response from recaptcha callback", response);
        },
        "expired-callback": () => {
          console.log("recaptch is expired");
        },
      },
      auth
    );
    setRC(recaptcha);
  }, []);
  return (
    <div className={styles.form}>
      <div className={styles.name}>
        <PersonIcon />
        <input type="text" placeholder="Name" />
      </div>
      <div className={styles.telephone}>
        <PhoneIcon />
        <input
          type="text"
          placeholder="Telephone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div className={styles.buttonGroup}>
        <button
          className={styles.confirm}
          id="sign-in-button"
          onClick={handlePhoneLogin}
        >
          CONFIRM
        </button>
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
