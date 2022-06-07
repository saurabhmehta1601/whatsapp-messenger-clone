import { Box } from "@mui/material";
import { TailOutImg, TailInImg } from "@Components/exports";
import React from "react";
import styles from "./styles.module.scss";

export const ChatMessage = ({ message }: any) => {
  return (
    <Box
      className={`${styles.container} ${
        message.recieved ? styles.recieved : ""
      }`}
    >
      <div className={styles.sender}>
        {!message.recieved ? (
          <div className={styles.tailInImg}>
            <TailInImg />
          </div>
        ) : (
          <div className={styles.tailOutImg}>
            <TailOutImg />
          </div>
        )}
        {message.sender}
      </div>
      <div className={styles.text}>{message.text}</div>
      <div className={styles.time}>{message.time}</div>
    </Box>
  );
};
