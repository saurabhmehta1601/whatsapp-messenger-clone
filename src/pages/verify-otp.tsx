import { OTPForm } from "@Components/LoginForm/OTPForm";
import React from "react";
import styles from "@Styles/Layout.module.scss";
import Image from "next/image";

const VerifyOTP = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Verify OTP</h1>
      <Image width={128} height={128} src="/whatsapp-logo.svg" alt="logo" />
      <div className={styles.formWrapper}>
        <OTPForm />
      </div>
    </div>
  );
};

export default VerifyOTP;
