import React from "react";
import styles from "@Styles/Home.module.scss";
import Image from "next/image";

const Home = () => {
  return (
    <div className={styles.page}>
      <div className={styles.welcome}>Welcome to Whatsapp</div>
      <div className={styles.whatsappLogoContainer}>
        <Image
          width={128}
          height={128}
          src="/whatsapp-logo.svg"
          className={styles.whatsappLogo}
        />
      </div>
      <div className={styles.termsAndConditions}>
        Read our{" "}
        <a href="https://www.whatsapp.com/legal/privacy-policy/">
          Privacy Policy
        </a>
        . Tap "Agree and continue " to accept the{" "}
        <a href="https://www.whatsapp.com/legal/terms-of-service">
          Terms of Service
        </a>
        .
      </div>
      <button>AGREE AND CONTINUE</button>

      <div className={styles.pageBottom}>
        <div className={styles.from}>from</div>
        <div className={styles.facebook}>FACEBOOK</div>
      </div>
    </div>
  );
};

export default Home;
