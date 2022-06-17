import { setActiveUser } from "@Redux/features/activeUser";
import { useAppDispatch } from "@Redux/hooks";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "./styles.module.scss";

interface IProps {
  confirmationResult: any;
}

export const OTPForm = ({ confirmationResult }: IProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [OTP, setOTP] = useState("");
  const [isFormDisabled, setIsFormDisabled] = useState(true);

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 6) setIsFormDisabled(false);
    if (e.target.value.length <= 6) setOTP(e.target.value);

    if (OTP.length === 6) {
      setIsFormDisabled(false);
    } else {
      setIsFormDisabled(true);
    }
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
      <button onClick={handleOTPVerification} disabled={isFormDisabled}>
        VERIFY OTP
      </button>
    </div>
  );
};
