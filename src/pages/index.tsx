import React from "react";
import styles from "@Styles/Home.module.scss";
import Image from "next/image";
import { LoginForm } from "@Components/exports";

const Home = () => {
  const [isLoginFormShown, setIsLoginFormShown] = React.useState(false);
  return (
    <div className={styles.page}>
      <div className={styles.welcome} data-testid="welcome-to-whatsapp">
        Welcome to Whatsapp
      </div>
      <div className={styles.whatsappLogoContainer}>
        <Image
          width={128}
          height={128}
          src="/whatsapp-logo.svg"
          alt="logo"
          className={styles.whatsappLogo}
        />
      </div>
      {isLoginFormShown ? (
        <LoginForm />
      ) : (
        <>
          <div className={styles.termsAndConditions}>
            Read our{" "}
            <a href="https://www.whatsapp.com/legal/privacy-policy/">
              Privacy Policy
            </a>
            . Tap &quot;Agree and continue&quot; to accept the{" "}
            <a href="https://www.whatsapp.com/legal/terms-of-service">
              Terms of Service
            </a>
            .
          </div>
          <button
            onClick={() => setIsLoginFormShown(true)}
            data-testid="agree-and-continue"
          >
            AGREE AND CONTINUE
          </button>
        </>
      )}

      <div className={styles.pageBottom}>
        <div className={styles.from}>from</div>
        <div className={styles.facebook}>
          META <Image width={32} height={32} src="/meta.svg" alt="meta logo" />
        </div>
      </div>
    </div>
  );
};

export default Home;
