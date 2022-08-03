import { Box } from "@mui/material";
import React from "react";
import { DesktopImg, GadgetsImg, LockImg } from "@Components/exports";
import styles from "./styles.module.scss";
import { motion } from "framer-motion";

export const DefaultChatSection = () => {
  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      className={styles.chatSectionContainer}
    >
      <GadgetsImg />
      <div className={styles.heroSection}>
        <h3 className={styles.heroTitle}>
          WhatsApp Web <span className={styles.new}>NEW</span>
        </h3>
        <p className={styles.featureDetail}>
          Now send and receive messages without keeping your phone online.
          <br /> Use WhatsApp on upto 4 linked devices and 1 phone at same time
          .
        </p>
        <div className={styles.downloadSuggestion}>
          <DesktopImg />
          <p>
            Make calls from Desktop with WhatsApp for Windows.
            <a href="https://www.whatsapp.com/download"> Get it here </a> .
          </p>
        </div>
        <div className={styles.e2eEncrypted}>
          <LockImg />
          End-to-end encrypted
        </div>
      </div>
    </motion.div>
  );
};
