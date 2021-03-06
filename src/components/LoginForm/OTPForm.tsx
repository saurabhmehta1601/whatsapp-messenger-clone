import {
  addUserToFirestoreIfNotExists,
  getUserByIdFromFirestore,
} from "@Firebase/utils/db/CRUD";
import { setActiveUser } from "@Redux/features/activeUser";
import { useAppDispatch } from "@Redux/hooks";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import styles from "./styles.module.scss";

interface IProps {
  confirmationResult: any;
  userName: string;
}

export const OTPForm = ({ confirmationResult, userName }: IProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const alert = useAlert();

  const [OTP, setOTP] = useState("");
  const [isFormDisabled, setIsFormDisabled] = useState(true);

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOTP(e.target.value);
    if (e.target.value.length === 6) {
      setIsFormDisabled(false);
    } else {
      setIsFormDisabled(true);
    }
  };

  const handleOTPVerification = async () => {
    setIsFormDisabled(true);
    try {
      const result = await confirmationResult.confirm(OTP);
      console.log("result = confirmationResult.confirm", result);
      const userId = result.user.uid;
      const userWithId = await getUserByIdFromFirestore(userId);
      console.log("found user is ", userWithId);
      if (!userWithId) {
        const newUser = {
          displayName: userName,
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
