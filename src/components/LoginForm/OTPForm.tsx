import { getUserByIdFromFirestore } from "@Firebase/utils/db/CRUD";
import useAlertError from "@Hooks/useAlertError";
import { setActiveUser } from "@Redux/features/activeUser";
import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import styles from "./styles.module.scss";

export const OTPForm = () => {
  const [OTP, setOTP] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { confirmationResult } = useAppSelector((state) => state.auth);
  const alert = useAlert();
  const alertError = useAlertError();

  const [isFormDisabled, setIsFormDisabled] = useState(true);

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOTP(e.target.value);
    if (e.target.value.length === 6) {
      setIsFormDisabled(false);
    } else {
      setIsFormDisabled(true);
    }
  };

  const handleOTPVerification = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      OTP: string;
    };
    setIsFormDisabled(true);
    try {
      if (!confirmationResult) {
        alert.error("Something went wrong. Please try again.");
        return;
      }

      const result = await confirmationResult.confirm(OTP);
      const userId = result.user.uid;
      const existingUser = await getUserByIdFromFirestore(userId);
      if (!existingUser) {
        router.push("/profile/" + userId);
      } else {
        dispatch(setActiveUser(existingUser));
        router.push("/group");
      }
      alert.success("Logged in successfully .");
    } catch (error: any) {
      alertError(error);
      setIsFormDisabled(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleOTPVerification}>
      <div className={styles.formControl}>
        <input
          type="number"
          name="OTP"
          placeholder="Enter OTP"
          value={OTP}
          onChange={handleOTPChange}
          max="999999"
          min="0"
        />
      </div>
      <button type="submit" disabled={isFormDisabled} className={styles.button}>
        VERIFY OTP
      </button>
    </form>
  );
};
