import { Box } from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";
import { AvatarImg, StatusImg, MenuImg, MessageImg } from "@Components/exports";

export const UserSection = () => {
  return (
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
  );
};
