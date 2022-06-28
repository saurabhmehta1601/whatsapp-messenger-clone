import { IGroupWithLastMessage } from "chat-app-types";
import { useRouter } from "next/router";
import React from "react";
import styles from "./styles.module.scss";
import { ChatItem } from "./ChatItem";
import { Stack } from "@mui/material";

interface IProps {
  groups: Array<IGroupWithLastMessage>;
}

export const RecentChatsList = ({ groups }: IProps) => {
  const router = useRouter();

  const navigateToGroup = (groupId: string) => {
    router.replace("/group/" + groupId);
  };

  return (
    <Stack className={styles.chatList}>
      {groups.map((group) => (
        <ChatItem group={group} onClick={() => navigateToGroup(group.id)} />
      ))}
    </Stack>
  );
};
