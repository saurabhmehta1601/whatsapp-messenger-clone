import React from "react";
import { Box } from "@mui/material";
import { ChatSection, LeftArrowImg } from "@Components/exports";
import styles from "./styles.module.scss";

export const CreateGroupPage = () => {
  return (
    <Box className={styles.page}>
      <div className={styles.createGroup}>
        <div className={styles.header}>
          <LeftArrowImg />
          Add group participants
        </div>
        <div className={styles.suggestedUsers}>
          <div className={styles.suggestedUser}>
            <div className={styles.photo}>
              <img src="https://via.placeholder.com/100" alt="user" />
            </div>
            <div className={styles.bio}>
              <div className={styles.name}>Saurabh</div>
              <div className={styles.status}>Very busy</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.chat}>
        {/* <DefaultChatSection /> */}
        <ChatSection />
      </div>
    </Box>
  );
};
