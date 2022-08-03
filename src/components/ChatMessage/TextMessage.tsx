import { TailOutImg, TailInImg } from "@Components/exports";
import React from "react";
import styles from "./styles.module.scss";
import { ITextMessage } from "chat-app-types";
import { getFormattedTime } from "@Utils/time";
import { useAppSelector } from "@Redux/hooks";

interface IProps {
  message: ITextMessage;
}

export const TextMessage = ({ message }: IProps) => {
  const activeUser = useAppSelector((state) => state.activeUser.data);
  const isYourMessage = message.sender.id === activeUser?.id;

  return (
    <div className={styles.textMessage}>
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
        {isYourMessage ? "YOU" : message.sender.name}
      </div>
      <div className={styles.text}>{message.text}</div>
      <div className={styles.time}>
        {getFormattedTime(message.createdAt.seconds * 1000)}
      </div>
    </div>
  );
};
