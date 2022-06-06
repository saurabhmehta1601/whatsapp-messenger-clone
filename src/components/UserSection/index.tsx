import { Box } from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";
import { AvatarImg, StatusImg, MenuImg, MessageImg } from "@Components/exports";
import SearchIcon from "@mui/icons-material/Search";

export const UserSection = () => {
  return (
    <>
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
      <Box className={styles.chatSearch}>
        <div className={styles.searchContainer}>
          <SearchIcon className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search or start new chat"
          />
        </div>
      </Box>
    </>
  );
};
