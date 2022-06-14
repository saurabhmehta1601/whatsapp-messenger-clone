import React from "react";
import styles from "./styles.module.scss";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";

export const LoginForm = () => {
  return (
    <div className={styles.form}>
      <div className={styles.name}>
        <PersonIcon />
        <input type="text" placeholder="Name" />
      </div>
      <div className={styles.telephone}>
        <PhoneIcon />
        <input type="number" placeholder="Telephone" />
      </div>
      <div className={styles.buttonGroup}>
        <button className={styles.confirm}>CONFIRM</button>
        <button className={styles.facebookConnect}>
          CONNECT WITH FACEBOOK
        </button>
      </div>
    </div>
  );
};
