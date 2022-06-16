import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import { loginWithFacebook } from "@Firebase/utils/auth";
import { addUserToFirestore } from "@Firebase/utils/db";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "@Firebase/app";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

const isValidName = (name: string) => {
  return name.length >= 3 && name.length <= 20;
};

export const LoginForm = () => {
  const [RC, setRC] = useState<any>(null);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState({ code: "+91", symbol: "IN" });
  const [name, setName] = useState("");

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
      country.code + phoneNumber,
      RC
    );
    setConfirmationResult(confirmationResult);
    console.log("confirmationResult", confirmationResult);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
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
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div className={styles.telephone}>
        <PhoneIcon />
        <span>{country.code}</span>
        <input
          type="number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div className={styles.buttonGroup}>
        <button
          className={styles.confirm}
          id="sign-in-button"
          onClick={handlePhoneLogin}
          disabled={
            !(isValidPhoneNumber(phoneNumber, (country as any).symbol) &&
            isValidName(name))
          }
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
