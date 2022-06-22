import { Container, Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import styles from "./styles.module.scss";

export const ChatSearch = () => {
  return (
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
  );
};
