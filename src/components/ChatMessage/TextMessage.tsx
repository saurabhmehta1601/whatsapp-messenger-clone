import React from "react";
import styles from "./styles.module.scss";
import { ITextMessage } from "chat-app-types";
import { getFormattedTime } from "@Utils/time";

interface IProps {
  message: ITextMessage;
}

export const TextMessage = ({ message }: IProps) => {
  return (
    <div className={styles.textMessage}>
      <div className={styles.text}>{message.text}</div>
      <div className={styles.time}>
        {getFormattedTime(message.createdAt.seconds * 1000)}
      </div>
    </div>
  );
};
