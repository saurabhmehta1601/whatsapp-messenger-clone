import { LoginForm } from "@Components/LoginForm";
import React from "react";
import styles from "@Styles/Login.module.scss";
import Image from "next/image";

const Login = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Join WhatsApp</h1>
      <Image width={128} height={128} src="/whatsapp-logo.svg" alt="logo" />
      <div className={styles.formWrapper}>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
