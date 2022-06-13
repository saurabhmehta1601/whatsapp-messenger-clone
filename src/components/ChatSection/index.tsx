import {
  AvatarImg,
  ChatInput,
  MenuImg,
  ChatMessage,
  EmojiPicker,
  DefaultChatSection,
} from "@Components/exports";
import { Box } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import styles from "./styles.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import { getMessagesInThreadSnapShot } from "@Firebase/utils/db";
import { IMessage } from "chat-app-types";
import { useAppSelector } from "@Redux/hooks";

export const ChatSection = () => {
  const emojiPickerContainerRef = useRef<HTMLDivElement>(null);
  // if threadId not exists in route path return Default Chat Section
  const [messages, setMessages] = useState<IMessage[] | null>(null);
  const router = useRouter();
  const shouldShowEmojiPicker = useAppSelector(
    (state) => state.ui.showEmojiPicker
  );
  const { threadId } = router.query;
  const chatMainRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    (async () => {
      if (threadId) {
        getMessagesInThreadSnapShot(threadId as string, (snapShot) => {
          const messages = snapShot.docs.map((doc: any) => ({
            ...doc.data(),
            id: doc.id,
          }));
          console.log("messages are", messages);
          setMessages(messages);
        });
      }
    })();
  }, []);

  // when messages update smooth scroll to bottom
  useEffect(() => {
    if (chatMainRef.current) {
      chatMainRef.current.scrollTo({
        top: chatMainRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  //
  useEffect(() => {
    let listener: any;
    if (chatMainRef.current) {
      chatMainRef.current.addEventListener("scroll", () => {
        const scrollHeight = chatMainRef.current?.scrollTop ?? 0;
        if (emojiPickerContainerRef.current) {
          if (scrollHeight > 0) {
            emojiPickerContainerRef.current.style.bottom = `${
              10 - scrollHeight
            }px`;
          }
        }
      });
    }
    return () => {
      if (typeof listener === "function") {
        listener();
      }
    };
  }, []);
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
          <Box className={styles.chatMainSection} ref={chatMainRef}>
            <div
              className={styles.emojiPickerContainer}
              ref={emojiPickerContainerRef}
            >
              {shouldShowEmojiPicker && (
                <EmojiPicker onClick={() => alert("picker ckice")} />
              )}
            </div>
            {messages?.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </Box>
          <ChatInput />
        </Box>
      )}
    </>
  );
};
