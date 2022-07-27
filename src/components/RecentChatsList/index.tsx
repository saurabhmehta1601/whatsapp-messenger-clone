import React from "react";
import styles from "./styles.module.scss";
import { ChatItem } from "./RecentChatItem";
import { Stack } from "@mui/material";
import Link from "next/link";
import { useAppSelector } from "@Redux/hooks";

export const RecentChatsList = () => {
  const groupIds = useAppSelector((state) => state.activeUser.data?.groupIds);
  console.log("groupIds ", groupIds);
  return (
    <>
      {!groupIds || (groupIds && groupIds.length == 0) ? (
        <div className={styles.noChats}> No chats yet </div>
      ) : (
        <Stack className={styles.chatList}>
          {groupIds.map((groupId) => (
            <Link href={"/group/" + groupId} key={groupId}>
              <ChatItem groupId={groupId} />
            </Link>
          ))}
        </Stack>
      )}
    </>
  );
};
