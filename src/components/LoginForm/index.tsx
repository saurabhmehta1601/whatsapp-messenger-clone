import React from "react";
import { FacebookLoginButton } from "./FacebookLoginButton";
import { PhoneLoginForm } from "./PhoneLoginForm";
import styles from "./styles.module.scss"

export const LoginForm = () => {
  return (
    <div className={styles.grid}>
      <PhoneLoginForm />
      <div className={styles.FBButtonContainer}>
        <FacebookLoginButton />
      </div>
    </div>
  );
};
