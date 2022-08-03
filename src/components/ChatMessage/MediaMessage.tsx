import React from "react";
import { IMediaMessage } from "chat-app-types";
import styles from "./styles.module.scss";

interface IProps {
  message: IMediaMessage;
}

const extensions = {
  image: ["png", "jpg", "jpeg", "gif"],
};

export const MediaMessage = ({ message }: IProps) => {
  console.log("media message is ", message);
  return (
    <div className={styles.mediaMessage}>
      <div className={styles.sender}>{message.sender.name}</div>
      {extensions.image.includes(message.extention) && (
        <img
          className={styles.imageMessage}
          src={message.mediaURL}
          style={{}}
        />
      )}
    </div>
  );
};
