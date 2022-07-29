import { MicImg, PinImg, SmileyImg } from "@Components/exports";
import {
  addMessageToFirestore,
  updateGroupInFirestore,
} from "@Firebase/utils/db/CRUD";
import { Box } from "@mui/material";
import { setChatTextInput, toggleEmojiPicker } from "@Redux/features/ui";
import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import { useRouter } from "next/router";
import React from "react";
import styles from "./styles.module.scss";

export const ChatInput = () => {
  const dispatch = useAppDispatch();
  const chatTextInput = useAppSelector((state) => state.ui.chatTextInput);
  const activeUser = useAppSelector((state) => state.activeUser.data);
  const router = useRouter();

  const sendMessage = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!activeUser) return;

    if (e.key === "Enter") {
      // clear chat input
      dispatch(setChatTextInput(""));

      const message = await addMessageToFirestore({
        text: chatTextInput,
        type: "text" ,
        groupId: router.query.groupId as string,
        sender: {
          id: activeUser.id ?? "",
          name: activeUser.displayName ?? "",
        },
      });
      await updateGroupInFirestore(router.query.groupId as string, {
        lastMessageId: message.id,
      });
      console.log("message added to firebase with id", message.id);
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
