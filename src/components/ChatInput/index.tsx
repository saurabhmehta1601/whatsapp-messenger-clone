import { MicImg, PinImg, SmileyImg } from "@Components/exports";
import {
  addMessageToFirestore,
  updateThreadInFirestore,
} from "@Firebase/utils/db";
import { useActiveUser } from "@Hooks/useActiveUser";
import { Box } from "@mui/material";
import { setChatTextInput, toggleEmojiPicker } from "@Redux/features/ui";
import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import { Timestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import styles from "./styles.module.scss";

export const ChatInput = () => {
  const dispatch = useAppDispatch();
  const chatTextInput = useAppSelector((state) => state.ui.chatTextInput);
  const activeUser = useActiveUser();
  const router = useRouter();
  const sendMessage = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const messageId = await addMessageToFirestore({
        senderId: activeUser.id,
        senderName: activeUser.displayName,
        text: chatTextInput,
        threadId: router.query.threadId as string,
      });
      await updateThreadInFirestore(router.query.threadId as string, { lastMessage: chatTextInput , lastMessagedAt: Timestamp.now()});
      dispatch(setChatTextInput(""));
      console.log("message added to firebase with id", messageId);
    }
  };
  return (
    <>
      <Box className={styles.chatInputContainer}>
        <div onClick={() => dispatch(toggleEmojiPicker())}>
          <SmileyImg />
        </div>
        <PinImg />
        <input
          type="text"
          className={styles.chatInput}
          placeholder="Type a message"
          value={chatTextInput}
          onChange={(e) => dispatch(setChatTextInput(e.target.value))}
          onKeyDown={sendMessage}
        />
        <MicImg />
      </Box>
    </>
  );
};
