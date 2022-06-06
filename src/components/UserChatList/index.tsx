import { Avatar, Container, Stack } from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";

type Chat = {
  lastMessage: {
    text: string;
    time: string;
  };
  sender: {
    name: string;
    avatar: string;
  };
};

interface IProps {
  chats: Array<Chat>;
}

export const UserChatList = ({ chats }: IProps) => {
  return (
    <Stack className={styles.chatList}>
      {chats.map((chat) => (
        <Container className={styles.chatItem}>
          <div className={styles.chatItemAvatar}>
            <Avatar src={chat.sender.avatar} />
          </div>
          <div className={styles.chatItemInfo}>
            <div className={styles.chatSenderAndLastMessage}>
              <div className={styles.chatItemSenderName}>
                {chat.sender.name}
              </div>
              <div className={styles.chatItemLastMessage}>
                {chat.lastMessage.text}
              </div>
            </div>
            <div className={styles.lastMessageTime}>
              {chat.lastMessage.time}
            </div>
          </div>
        </Container>
      ))}
    </Stack>
  );
};
