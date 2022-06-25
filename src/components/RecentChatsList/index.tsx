import { IThreadWithLastMessage } from "chat-app-types";
import { useRouter } from "next/router";
import React from "react";
import styles from "./styles.module.scss";
import { ChatItem } from "./ChatItem";
import { Stack } from "@mui/material";

interface IProps {
  threads: Array<IThreadWithLastMessage>;
}

export const RecentChatsList = ({ threads }: IProps) => {
  const router = useRouter();

  const navigateToThread = (threadId: string) => {
    router.replace("/thread/" + threadId);
  };

  return (
    <Stack className={styles.chatList}>
      {threads.map((thread) => (
        <ChatItem thread={thread} onClick={() => navigateToThread(thread.id)} />
      ))}
    </Stack>
  );
};
