import React, { useState } from "react";
import styles from "./styles.module.scss";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "@Firebase/app";
import { isValidPhoneNumber } from "react-phone-number-input";
import { OTPForm } from "./OTPForm";
import { FacebookLoginButton } from "./FacebookLoginButton";

const isValidName = (name: string) => {
  return name.length >= 3 && name.length <= 20;
};

export const LoginForm = () => {
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState({ code: "+91", symbol: "IN" });
  const [name, setName] = useState("");
  const [isOTPFormVisible, setIsOTPFormVisible] = useState(false);

  const handlePhoneLogin = async () => {
    const verifier = new RecaptchaVerifier(
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

    const confirmationResult = await signInWithPhoneNumber(
      auth,
      country.code + phoneNumber,
      verifier
    );
    setConfirmationResult(confirmationResult);
    console.log("confirmationResult", confirmationResult);
    setIsOTPFormVisible(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 20) setName(e.target.value);
  };

  return (
    <>
      {isOTPFormVisible ? (
        <OTPForm confirmationResult={confirmationResult} />
      ) : (
        <div className={styles.form}>
          <div className={styles.formControl}>
            <PersonIcon />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className={styles.formControl}>
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
                !(
                  isValidPhoneNumber(phoneNumber, (country as any).symbol) &&
                  isValidName(name)
                )
              }
            >
              CONFIRM
            </button>
            <FacebookLoginButton />
          </div>
        </div>
      )}
    </>
  );
};
