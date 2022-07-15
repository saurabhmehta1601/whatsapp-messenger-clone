import { Container, Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import styles from "./styles.module.scss";
import { useAppDispatch } from "@Redux/hooks";
import { setSearchChatInput } from "@Redux/features/ui";

export const ChatSearch = () => {
  const dispatch = useAppDispatch();

  return (
    <Box className={styles.chatSearch}>
      <Container>
        <div className={styles.searchContainer}>
          <SearchIcon className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search or start new chat"
            onChange={(e) => dispatch(setSearchChatInput(e.target.value))}
          />
        </div>
      </Container>
    </Box>
  );
};
