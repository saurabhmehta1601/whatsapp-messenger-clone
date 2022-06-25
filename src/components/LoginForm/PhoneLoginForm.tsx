import React, { useState } from "react";
import styles from "./styles.module.scss";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "@Firebase/app";
import { isValidPhoneNumber } from "react-phone-number-input";

const isValidName = (name: string) => {
  return name.length >= 3 && name.length <= 20;
};

interface IProps {
  name: string;
  setName: (name: string) => void;
  setConfirmationResult: (confirmationResult: any) => void;
  setIsOTPFormVisible: (isOTPFormVisible: boolean) => void;
}

export const PhoneLoginForm = ({
  name,
  setConfirmationResult,
  setIsOTPFormVisible,
  setName,
}: IProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState({ code: "+91", symbol: "IN" });
  const [loginDisabled, setLoginDisabled] = useState(false);

  const handlePhoneLogin = async () => {
    setLoginDisabled(true);
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
      <button
        className={styles.button}
        id="sign-in-button"
        onClick={handlePhoneLogin}
        disabled={
          loginDisabled ||
          !(
            isValidPhoneNumber(phoneNumber, (country as any).symbol) &&
            isValidName(name)
          )
        }
      >
        CONFIRM
      </button>
    </div>
  );
};
