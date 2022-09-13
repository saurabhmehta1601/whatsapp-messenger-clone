import { ChatInput, MenuImg, EmojiPicker } from "@Components/exports";
import { Avatar, Box } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import styles from "./styles.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import { getMessagesInGroupSnapShot } from "@Firebase/utils/db/snapshots";
import { IChatMessage, IGroup, IMessage } from "chat-app-types";
import { useAppSelector } from "@Redux/hooks";
import { ContentLayout } from "layouts/ContentLayout";
import { HeaderLayout } from "layouts/HeaderLayout";
import { getGroupByIdFromFirestore } from "@Firebase/utils/db/CRUD";
import { ChatMessage } from "@Components/ChatMessage";

export const ChatSection = () => {
  const emojiPickerContainerRef = useRef<HTMLDivElement>(null);
  // if groupId not exists in route path return Default Chat Section
  const [messages, setMessages] = useState<IChatMessage[] | null>(null);
  const [activeGroup, setActiveGroup] = useState<IGroup | null>(null);
  const activeChatGroupId = useAppSelector((state) => state.activeChatGroup.id);
  const shouldShowEmojiPicker = useAppSelector(
    (state) => state.ui.showEmojiPicker
  );
  const chatMainRef = useRef<HTMLDivElement>(null);

  // if groupId exists in route path then get messages for group with this id
  useEffect(() => {
    (async () => {
      // GET group by id
      if (activeChatGroupId) {
        const group = await getGroupByIdFromFirestore(activeChatGroupId);
        if (group) setActiveGroup(group);
        // GET all messages in the group
        getMessagesInGroupSnapShot(activeChatGroupId, (snapShot) => {
          const messages = snapShot.docs.map((doc: any) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setMessages(messages);
        });
      }
    })();
  }, [activeChatGroupId]);

  // when messages update smooth scroll to bottom
  useEffect(() => {
    if (chatMainRef.current) {
      chatMainRef.current.scrollTo({
        top: chatMainRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // make emoji picker stick to bottom of screen when scrolled
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
    <ContentLayout className={styles.content}>
      <HeaderLayout className={styles.header}>
        <Avatar src={activeGroup?.photoURL ?? ""} />
        <div className={styles.groupName}>{activeGroup?.name}</div>
        <div className={styles.iconGroup}>
          <SearchIcon />
          <MenuImg />
        </div>
      </HeaderLayout>
      <Box className={styles.chatMainSection} ref={chatMainRef}>
        <div
          className={styles.emojiPickerContainer}
          ref={emojiPickerContainerRef}
        >
          {shouldShowEmojiPicker && <EmojiPicker />}
        </div>
        {messages?.map((message) => {
          return <ChatMessage key={message.id} message={message} />;
        })}
      </Box>
      <ChatInput />
    </ContentLayout>
  );
};
