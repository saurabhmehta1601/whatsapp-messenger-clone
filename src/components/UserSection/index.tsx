import { DocumentData } from "firebase/firestore";
import { Avatar, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
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
import {
  getThreadByIdFromFirestore,
  getUserByIdFromFirestore,
} from "@Firebase/utils/db";
import { IUser } from "chat-app-types";

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
  const [activeUser, setActiveUser] = useState<IUser | null>(null);
  const [activeUserThreads, setActiveUserThreads] = useState<any>([]);
  useEffect(() => {
    (async () => {
      const activeUser = await getUserByIdFromFirestore("krdrnG9caTRrpQeANlrC");
      if (activeUser) {
        console.log("activeUser is ", activeUser);
        setActiveUser(activeUser as IUser);
        // request to get all threads of active user
        const getThreadRequests: Promise<DocumentData | undefined>[] = [];
        activeUser.threadIds.forEach((id: string) => {
          getThreadRequests.push(getThreadByIdFromFirestore(id));
        });
        // Promise.all resolves once all promises are resolved unlike promise.allSettled
        const threads = await Promise.all(getThreadRequests);
        setActiveUserThreads(threads);
      }
    })();
  }, []);
  return (
    <Box className={styles.userSectionContainer}>
      {/* user section header */}
      <Box className={styles.header}>
        {activeUser?.photoURL ? (
          <Avatar src={activeUser.photoURL} alt={activeUser.displayName} />
        ) : (
          <AvatarImg />
        )}

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
      <UserChatList threads={activeUserThreads} />
    </Box>
  );
};
