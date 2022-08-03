import React from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { IMediaMessage } from "chat-app-types";
import styles from "./styles.module.scss";
import { getFormattedTime } from "@Utils/time";

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
      {extensions.image.includes(message.extention) && (
        <a target="_blank" href={message.mediaURL} rel="noreferrer">
          <img className={styles.imageMessage} src={message.mediaURL} />
          <div className={styles.time}>
            {getFormattedTime(message.createdAt.seconds * 1000)}
          </div>
        </a>
      )}
      {!extensions.image.includes(message.extention) && (
        <div className={styles.documentMessage}>
          <DescriptionIcon
            fontSize={"large"}
            className={styles.descriptionIcon}
          />
          <div>{message.fileName}</div>
          <a href={message.mediaURL}>
            <ArrowCircleDownIcon
              fontSize={"large"}
              className={styles.downloadIcon}
            />
          </a>
        </div>
      )}
    </div>
  );
};
