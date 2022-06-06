import { Box } from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";
import {
  AvatarImg,
  StatusImg,
  MenuImg,
  MessageImg,
  UserChatList,
} from "@Components/exports";
import SearchIcon from "@mui/icons-material/Search";
import { Container } from "@mui/system";

const User = {
  lastMessage: {
    text: "Call you later",
    time: "Yesterday",
  },
  sender: {
    name: "saurabh",
    avatar:
      "https://images.unsplash.com/photo-1603357465999-241beecc2629?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1864&q=80",
  },
};

export const UserSection = () => {
  return (
    <Box className={styles.userSectionContainer}>
      {/* user section header */}
      <Box className={styles.header}>
        <div className={styles.accountLogoContainer}>
          <AvatarImg />
        </div>
        <div className={styles.iconGroup}>
          <StatusImg />
          <MessageImg />
          <MenuImg />
        </div>
      </Box>
      {/* chat search */}
      <Box className={styles.chatSearch}>
        <Container>
          <div className={styles.searchContainer}>
            <SearchIcon className={styles.searchIcon} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search or start new chat"
            />
          </div>
        </Container>
      </Box>
      {/* user Chats  */}
      <UserChatList
        chats={[User, User, User, User, User, User, User, User, User, User]}
      />
    </Box>
  );
};
