import React, { useState } from "react";
import styles from "./styles.module.scss";
import PhoneIcon from "@mui/icons-material/Phone";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "@Firebase/app";
import { useRouter } from "next/router";
import { useAppDispatch } from "@Redux/hooks";
import { setConfirmationResult } from "@Redux/features/auth";
import { useAlert } from "react-alert";

export const PhoneLoginForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState({ code: "+91", symbol: "IN" });
  const [loginDisabled, setLoginDisabled] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const alert = useAlert();

  const handlePhoneLogin = async () => {
    setLoginDisabled(true);
    try {
      const verifier = new RecaptchaVerifier(
        "sign-in-button",
        {
          size: "invisible",
          callback: () => {},
          "expired-callback": () => {
            alert.error("Recaptch Expired");
          },
        },
        auth
      );

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        country.code + phoneNumber,
        verifier
      );
      if (confirmationResult)
        dispatch(setConfirmationResult(confirmationResult));
      router.push("/verify-otp");
    } catch (error) {
      setLoginDisabled(false);
      console.log("error", error);
    }
  };

  return (
    <div className={styles.form}>
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
        disabled={loginDisabled || phoneNumber.length < 10}
      >
        CONFIRM
      </button>
    </div>
  );
};
