import { Avatar, Container, Stack } from "@mui/material";
import { getFormattedTime } from "@Utils/time";
import { IThreadWithLastMessage } from "chat-app-types";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styles from "./styles.module.scss";

interface IProps {
  threads: Array<IThreadWithLastMessage>;
}

export const ChatsList = ({ threads }: IProps) => {
  const router = useRouter();
  const navigateToThread = (threadId: string) => {
    router.replace("/thread/" + threadId);
  };

  useEffect(() => {}, []);

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
                {thread.name ?? "College"}
              </div>
              <div className={styles.chatItemLastMessage}>
                {thread.lastMessage.text.length > 20
                  ? thread.lastMessage.text.substring(0, 20) + "..."
                  : thread.lastMessage.text}
              </div>
            </div>
            <div className={styles.lastMessageTime}>
              {getFormattedTime(thread.lastMessage.createdAt.seconds * 1000)}
            </div>
          </div>
        </Container>
      ))}
    </Stack>
  );
};
