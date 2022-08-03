import { MicImg, PinImg, SmileyImg } from "@Components/exports";
import { Box } from "@mui/material";
import { setChatTextInput, toggleEmojiPicker } from "@Redux/features/ui";
import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import { useRouter } from "next/router";
import React from "react";
import styles from "./styles.module.scss";

import { sendMessage } from "@Utils/sendMessage";

export const ChatInput = () => {
  const dispatch = useAppDispatch();
  const chatTextInput = useAppSelector((state) => state.ui.chatTextInput);
  const activeUser = useAppSelector((state) => state.activeUser.data);
  const router = useRouter();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleTextMessageSubmit = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (!activeUser) return;

    if (e.key === "Enter") {
      // clear chat input
      dispatch(setChatTextInput(""));

      await sendMessage({
        text: chatTextInput,
        type: "text",
        groupId: router.query.groupId as string,
        sender: {
          id: activeUser.id ?? "",
          name: activeUser.displayName ?? "",
        },
      });
    }
  };

  const handleInputFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!activeUser) return;

    if (e.target.files?.length && e.target.files?.length > 0) {
      const extension = e.target.files[0].name.split(".").pop();

      const file = e.target.files[0];
      await sendMessage({
        name: file.name,
        type: "media",
        file,
        extension,
        sender: {
          id: activeUser.id,
          name: activeUser.displayName ?? "",
        },
        groupId: router.query.groupId as string,
      });
    }
  };
  return (
    <>
      <Box className={styles.chatInputContainer}>
        <div onClick={() => dispatch(toggleEmojiPicker())}>
          <SmileyImg />
        </div>
        <div>
          <input
            ref={fileInputRef}
            onChange={handleInputFileChange}
            id="file-upload"
            type="file"
            style={{ display: "none" }}
          />
          <label htmlFor="file-upload">
            <PinImg />
          </label>
        </div>
        <input
          type="text"
          className={styles.chatInput}
          placeholder="Type a message"
          value={chatTextInput}
          onChange={(e) => dispatch(setChatTextInput(e.target.value))}
          onKeyDown={handleTextMessageSubmit}
        />
        <MicImg />
      </Box>
    </>
  );
};
