import { Box } from "@mui/material";
import { TailOutImg, TailInImg } from "@Components/exports";
import React from "react";
import styles from "./styles.module.scss";
import { IMessage } from "chat-app-types";

interface IProps {
  message: Omit<IMessage, "id">;
}

export const ChatMessage = ({ message }: IProps) => {
  return (
    <Box
      className={`${styles.container} ${
        // message.recieved ? styles.recieved : ""
        true ? styles.recieved : ""
      }`}
    >
      <div className={styles.sender}>
        {/* {!message.recieved ? ( */}
        {false ? (
          <div className={styles.tailInImg}>
            <TailInImg />
          </div>
        ) : (
          <div className={styles.tailOutImg}>
            <TailOutImg />
          </div>
        )}
        {message.senderName}
      </div>
      <div className={styles.text}>{message.text}</div>
      <div className={styles.time}>Today</div>
    </Box>
  );
};
