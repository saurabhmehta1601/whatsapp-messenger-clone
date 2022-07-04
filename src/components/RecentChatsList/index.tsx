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
    <>
      {groups.length === 0 ? (
        <div className={styles.noChats}> No chats yet </div>
      ) : (
        <Stack className={styles.chatList}>
          {groups.map((group) => (
            <Link href={"/group/" + group?.id} key={group?.id}>
              <ChatItem group={group} />
            </Link>
          ))}
        </Stack>
      )}
    </>
  );
};
