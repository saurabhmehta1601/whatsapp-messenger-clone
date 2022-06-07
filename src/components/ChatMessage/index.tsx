import { TailInImg } from "@Components/TailInImg";
import { Box } from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";

export const ChatMessage = ({ message }: any) => {
  return (
    <Box className={styles.container}>
      <div className={styles.sender}>
        <div className={styles.tailInImg}>
          <TailInImg />
        </div>
        {message.sender}
      </div>
      <div className={styles.text}>{message.text}</div>
      <div className={styles.time}>{message.time}</div>
    </Box>
  );
};
