import {
  AvatarImg,
  ChatInput,
  MenuImg,
  ChatMessage,
} from "@Components/exports";
import { Box } from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";
import SearchIcon from "@mui/icons-material/Search";

export const ChatSection = ({ sender }: any) => {
  return (
    <Box className={styles.chatContainer}>
      <Box className={styles.header}>
        <AvatarImg />
        <div className={styles.senderName}>{sender.userName}</div>
        <div className={styles.iconGroup}>
          <SearchIcon />
          <MenuImg />
        </div>
      </Box>
      <Box className={styles.chatMainSection}>
        <ChatMessage
          message={{ sender: "saurabh", text: "Hiii", time: "7:10 am" }}
        />
        <ChatMessage
          message={{ sender: "Rohan", text: "Hiii, How are you ? are you doing well I have completed whatsapp clone UI now the functionality part remains ", time: "7:10 am" }}
        />
      </Box>
      <ChatInput />
    </Box>
  );
};
