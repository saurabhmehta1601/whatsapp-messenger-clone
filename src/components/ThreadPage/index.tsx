import React from "react";
import { Box } from "@mui/material";
import { ChatSection, UserSection } from "@Components/exports";
import styles from "./styles.module.scss";

export const ThreadPage = () => {
  return (
    <Box className={styles.page}>
      <div className={styles.user}>
        <UserSection />
      </div>
      <div className={styles.chat}>
        {/* <DefaultChatSection /> */}
        <ChatSection />
      </div>
    </Box>
  );
};
