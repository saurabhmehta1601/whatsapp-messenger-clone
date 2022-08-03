import {
  addUserToFirestoreIfNotExists,
  getUserByIdFromFirestore,
} from "@Firebase/utils/db/CRUD";
import { setActiveUser } from "@Redux/features/activeUser";
import { setOTP } from "@Redux/features/auth";
import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import styles from "./styles.module.scss";

export const OTPForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { username, confirmationResult, OTP } = useAppSelector(
    (state) => state.auth
  );
  const alert = useAlert();

  const [isFormDisabled, setIsFormDisabled] = useState(true);

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setOTP(e.target.value));
    if (e.target.value.length === 6) {
      setIsFormDisabled(false);
    } else {
      setIsFormDisabled(true);
    }
  };

  const handleOTPVerification = async () => {
    setIsFormDisabled(true);
    try {
      if (!confirmationResult) {
        alert.error("Something went wrong. Please try again.");
        return;
      }

      const result = await confirmationResult.confirm(OTP);
      const userId = result.user.uid;
      const userWithId = await getUserByIdFromFirestore(userId);
      console.log("found user is ", userWithId);
      if (!userWithId) {
        const newUser = {
          displayName: username,
          phoneNumber: result.user.phoneNumber,
          groupIds: [],
          photoURL: null,
          status: "Hey there! I am using whatsApp.",
        };
        await addUserToFirestoreIfNotExists(userId, newUser);
        dispatch(setActiveUser({ id: userId, ...newUser }));
      } else {
        dispatch(setActiveUser(userWithId));
      }
      alert.success("Logged in successfully .");
      router.push("/group");
    } catch (error: any) {
      if (error.code === "auth/code-expired") {
        alert.error("OTP expired. Please try again.");
      } else if (error.code === "auth/invalid-verification-code") {
        alert.error("Invalid OTP. Please try again.");
      } else {
        console.log("error code ", error.code);
      }
      setIsFormDisabled(false);
    }
  };

  return (
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
        disabled={isFormDisabled}
        className={styles.button}
      >
        VERIFY OTP
      </button>
    </div>
  );
};
