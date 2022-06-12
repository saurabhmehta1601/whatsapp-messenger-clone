import {
  AvatarImg,
  ChatInput,
  MenuImg,
  ChatMessage,
  EmojiPicker,
  DefaultChatSection,
} from "@Components/exports";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import {
  getMessagesInThread,
  getThreadByIdFromFirestore,
} from "@Firebase/utils/db";
import { IMessage, IThread } from "chat-app-types";

export const ChatSection = () => {
  // if threadId not exists in route path return Default Chat Section
  const [messages, setMessages] = useState<IMessage[] | null>(null);
  const [thread, setThread] = useState<IThread | null>(null);
  const router = useRouter();
  const { threadId } = router.query;
  // If threadId exists in route path return chats in thread
  useEffect(() => {
    (async () => {
      if (threadId) {
        console.log("Thread id is ", threadId);
        const thread = await getMessagesInThread(threadId as string);
        if (thread) {
          console.log("chatsection rendered line 43");
          console.log("Thread is ", thread);
          setMessages(thread as IMessage[]);
        }
      }
    })();
  }, []);
  return (
    <>
      {!threadId ? (
        <DefaultChatSection />
      ) : (
        <Box className={styles.chatContainer}>
          <Box className={styles.header}>
            <AvatarImg />
            <div className={styles.groupOrRecieverName}>
              { "Unnamed"}
            </div>
            <div className={styles.iconGroup}>
              <SearchIcon />
              <MenuImg />
            </div>
          </Box>
          <Box className={styles.chatMainSection}>
            <div className={styles.emojiPickerContainer}>
              <EmojiPicker />
            </div>
            <ChatMessage
              message={{
                senderName: "Rohan",
                text: "Hiii",
                createdAt: "7:10 am",
              }}
            />
            {messages?.map((message) => (
              <ChatMessage
                key={message.id}
                message={{
                  senderName: message.senderName,
                  text: message.text,
                  createdAt: JSON.stringify(message.createdAt),
                }}
              />
            ))}
          </Box>
          <ChatInput />
        </Box>
      )}
    </>
  );
};
