import { TailOutImg, TailInImg } from "@Components/exports";
import { IMediaMessage, ITextMessage } from "chat-app-types";
import React from "react";
import { TextMessage } from "./TextMessage";
import { MediaMessage } from "./MediaMessage";
import { useAppSelector } from "@Redux/hooks";
import { Box } from "@mui/material";
import styles from "./styles.module.scss";

interface IProps {
  message: ITextMessage | IMediaMessage;
}

export const ChatMessage = ({ message }: IProps) => {
  const activeUser = useAppSelector((state) => state.activeUser.data);
  const isYourMessage = message.sender.id === activeUser?.id;

  return (
    <>
      <Box
        className={`${styles.container} ${isYourMessage ? styles.sent : ""}`}
      >
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
        {message.type === "text" && (
          <TextMessage message={message as ITextMessage} />
        )}
        {message.type === "media" && (
          <MediaMessage message={message as IMediaMessage} />
        )}
      </Box>
    </>
  );
};
