import { AvatarImg, MenuImg } from "@Components/exports";
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
      ;
    </Box>
  );
};
