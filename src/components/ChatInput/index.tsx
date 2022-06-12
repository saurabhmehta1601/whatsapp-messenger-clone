import { MicImg, PinImg, SmileyImg } from "@Components/exports";
import { Box } from "@mui/material";
import { setChatTextInput, toggleEmojiPicker } from "@Redux/features/ui";
import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import React from "react";
import styles from "./styles.module.scss";

export const ChatInput = () => {
  const dispatch = useAppDispatch();
  const chatTextInput = useAppSelector((state) => state.ui.chatTextInput);
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
        />
        <MicImg />
      </Box>
    </>
  );
};
