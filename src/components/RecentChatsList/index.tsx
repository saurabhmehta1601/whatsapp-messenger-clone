import React from "react";
import styles from "./styles.module.scss";
import { ChatItem } from "./RecentChatItem";
import { Stack } from "@mui/material";
import { useAppSelector } from "@Redux/hooks";

export const RecentChatsList = () => {
  const groupIds = useAppSelector((state) => state.activeUser.data?.groupIds);
  return (
    <>
      {!groupIds || (groupIds && groupIds.length == 0) ? (
        <div className={styles.noChats}> No chats yet </div>
      ) : (
        <Stack className={styles.chatList}>
          {groupIds.map((groupId) => (
            <ChatItem groupId={groupId} key={groupId} />
          ))}
        </Stack>
      )}
    </>
  );
};
