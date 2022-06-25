import { Box } from "@mui/material";
import { TailOutImg, TailInImg } from "@Components/exports";
import React from "react";
import styles from "./styles.module.scss";
import { IMessage } from "chat-app-types";
import { useActiveUser } from "@Hooks/useActiveUser";
import { getFormattedTime } from "@Utils/time";

interface IProps {
  message: IMessage;
}

export const ChatMessage = ({ message }: IProps) => {
  const activeUser = useActiveUser();

  const isYourMessage = message.senderId === activeUser.id;
  return (
    <Box className={`${styles.container} ${isYourMessage ? styles.sent : ""}`}>
      <div className={styles.sender}>
        {!isYourMessage ? (
          <div className={styles.tailInImg}>
            <TailInImg />
          </div>
        ) : (
          <div className={styles.tailOutImg}>
            <TailOutImg />
          </div>
        )}
        {isYourMessage ? "YOU" : message.senderName}
      </div>
      <div className={styles.text}>{message.text}</div>
      <div className={styles.time}>
        {getFormattedTime(message.createdAt.seconds * 1000)}
      </div>
    </Box>
  );
};
