        // getT
        // if (thread) {
        //   console.log("Thread is ", thread);
        //   setMessages(thread as IMessage[]);
        // }
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
  getMessagesInThreadSnapShot,
} from "@Firebase/utils/db";
import { IMessage, IThread } from "chat-app-types";
import { useAppSelector } from "@Redux/hooks";

export const ChatSection = () => {
  // if threadId not exists in route path return Default Chat Section
  const [messages, setMessages] = useState<IMessage[] | null>(null);
  const [thread, setThread] = useState<IThread | null>(null);
  const router = useRouter();
  const shouldShowEmojiPicker = useAppSelector(
    (state) => state.ui.showEmojiPicker
  );
  const { threadId } = router.query;
  useEffect(() => {
    (async () => {
      if (threadId) {
        getMessagesInThreadSnapShot(threadId as string, (snapShot) => {
          const messages = snapShot.docs.map((doc: any) =>  ({
              ...doc.data(),
              id: doc.id,
          })) 
          setMessages(messages);
          })}
  })()}, []);
  return (
    <>
      {!threadId ? (
        <DefaultChatSection />
      ) : (
        <Box className={styles.chatContainer}>
          <Box className={styles.header}>
            <AvatarImg />
            <div className={styles.groupOrRecieverName}>{"Unnamed"}</div>
            <div className={styles.iconGroup}>
              <SearchIcon />
              <MenuImg />
            </div>
          </Box>
          <Box className={styles.chatMainSection}>
            <div className={styles.emojiPickerContainer}>
              {shouldShowEmojiPicker && (
                <EmojiPicker onClick={() => alert("picker ckice")} />
              )}
            </div>
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
