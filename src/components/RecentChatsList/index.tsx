import { IGroupWithLastMessage } from "chat-app-types";
import React from "react";
import styles from "./styles.module.scss";
import { ChatItem } from "./ChatItem";
import { Stack } from "@mui/material";
import Link from "next/link";
interface IProps {
  groups: Array<IGroupWithLastMessage>;
}

export const RecentChatsList = ({ groups }: IProps) => {
  return (
    <Stack className={styles.chatList}>
      {groups.map((group) => (
        <Link href={"/group/" + group.id}>
          <ChatItem group={group} />
        </Link>
      ))}
    </Stack>
  );
};
