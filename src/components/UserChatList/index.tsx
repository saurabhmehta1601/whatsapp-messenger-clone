import { Avatar, Container, Stack } from "@mui/material";
import { IThread } from "chat-app-types";
import { useRouter } from "next/router";
import React from "react";
import styles from "./styles.module.scss";

interface IProps {
  threads: Array<IThread>;
}

export const UserChatList = ({ threads }: IProps) => {
  const router = useRouter();
  const navigateToThread = (threadId: string) => {
    router.replace("/thread/" + threadId);
  };
  return (
    <Stack className={styles.chatList}>
      {threads.map((thread) => (
        <Container
          key={thread.id}
          onClick={() => navigateToThread(thread.id)}
          className={styles.chatItem}
        >
          <div className={styles.chatItemAvatar}>
            {thread.photoURL ? (
              <Avatar src={thread.photoURL} />
            ) : (
              <Avatar src="" />
            )}
          </div>
          {/* Chat Thread */}
          <div className={styles.chatItemInfo}>
            <div className={styles.chatSenderAndLastMessage}>
              <div className={styles.chatItemSenderName}>
                {thread.name ?? "Not group"}
              </div>
              <div className={styles.chatItemLastMessage}>
                {thread.lastMessage}
              </div>
            </div>
            <div className={styles.lastMessageTime}>
              {JSON.stringify(thread.lastMessagedAt)}
            </div>
          </div>
        </Container>
      ))}
    </Stack>
  );
};
