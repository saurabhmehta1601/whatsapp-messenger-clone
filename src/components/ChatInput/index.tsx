import { MicImg, PinImg, SmileyImg } from "@Components/exports";
import { Box } from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";

export const ChatInput = () => {
  return (
    <Box className={styles.chatInputContainer}>
      <SmileyImg />
      <PinImg />
      <input
        type="text"
        className={styles.chatInput}
        placeholder="Type a message"
      />
      <MicImg />
    </Box>
  );
};
