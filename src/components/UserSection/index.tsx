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
  DropDown,
} from "@Components/exports";
import SearchIcon from "@mui/icons-material/Search";
import { Container } from "@mui/system";
import { getThreadByIdWithLastMessageFromFirestore } from "@Firebase/utils/db/CRUD";
import { useActiveUser } from "@Hooks/useActiveUser";
import { signOutUser } from "@Firebase/utils/auth";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";

export const UserSection = () => {
  const [activeUserThreads, setActiveUserThreads] = useState<any>([]);
  const activeUser = useActiveUser();
  const router = useRouter();
  const alert = useAlert();

  const handleLogOut = async () => {
    await signOutUser();
    router.replace("/");
    alert.success("Logged out successfully .");
    console.log("redirect to / after logout ");
  };

  useEffect(() => {
    (async () => {
      if (activeUser) {
        // request to get all threads of active user
        const getThreadRequests: Promise<DocumentData | undefined>[] = [];
        activeUser.threadIds.forEach((id: string) => {
          getThreadRequests.push(getThreadByIdWithLastMessageFromFirestore(id));
        });
        // Promise.all resolves once all promises are resolved unlike promise.allSettled
        const threads = await Promise.all(getThreadRequests);
        setActiveUserThreads(threads);
      }
    })();
  }, [activeUser]);
  return (
    <Box className={styles.userSectionContainer}>
      {/* user section header */}
      <Box className={styles.header}>
        {activeUser?.photoURL ? (
          <Avatar
            src={activeUser.photoURL}
            alt={activeUser.displayName ?? ""}
          />
        ) : (
          <AvatarImg />
        )}

        <div className={styles.iconGroup}>
          <StatusImg />
          <MessageImg />
          {/* <MenuImg /> */}
          <DropDown
            options={[
              {
                label: "New group",
                onSelect: signOutUser,
              },
              { label: "Log out", onSelect: handleLogOut },
            ]}
            containerStyle={{
              position: "relative",
              bottom: "-2px",
            }}
          >
            <MenuImg />
          </DropDown>
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
