import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import { loginWithFacebook } from "@Firebase/utils/auth";
import { addUserToFirestore } from "@Firebase/utils/db";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "@Firebase/app";
import { isValidPhoneNumber } from "react-phone-number-input";
import { setActiveUser } from "@Redux/features/activeUser";
import { useAppDispatch } from "@Redux/hooks";
import { useRouter } from "next/router";

const isValidName = (name: string) => {
  return name.length >= 3 && name.length <= 20;
};

export const LoginForm = () => {
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState({ code: "+91", symbol: "IN" });
  const [name, setName] = useState("");
  const [isOTPFormVisible, setIsOTPFormVisible] = useState(false);
  const [OTP, setOTP] = useState("");
  const dispatch = useAppDispatch();
  const [isVerifyOTPDisabled, setIsVerifyOTPDisabled] = useState(true);

  const router = useRouter();

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

  const handleOTPVerification = async () => {
    try {
      const result = await confirmationResult.confirm(OTP);
      console.log("confirmationResult.confirm", result);
      dispatch(setActiveUser(result.user));
      router.push("/thread");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOTP(e.target.value);

    if (OTP.length === 6) {
      setIsVerifyOTPDisabled(false);
    } else {
      setIsVerifyOTPDisabled(true);
    }
  };

  return (
    <>
      {isOTPFormVisible ? (
        <div className={styles.form}>
          <div className={styles.formControl}>
            <input
              type="number"
              placeholder="Enter OTP"
              value={OTP}
              onChange={handleOTPChange}
              max="999999"
              min="0"
            />
          </div>
          <button
            onClick={handleOTPVerification}
            // disabled={isVerifyOTPDisabled}
          >
            VERIFY OTP
          </button>
        </div>
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
            <button
              className={styles.facebookConnect}
              onClick={handleFacebookLogin}
            >
              CONNECT WITH FACEBOOK
            </button>
          </div>
        </div>
      )}
    </>
  );
};
