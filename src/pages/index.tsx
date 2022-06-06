import { Box } from "@mui/material";
import type { NextPage } from "next";
import {
  ChatSection,
  UserSection,
  DefaultChatSection,
} from "@Components/exports";
import styles from "@Styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <Box className={styles.page}>
      <div className={styles.user}>
        <UserSection />
      </div>
      <div className={styles.chat}>
        {/* <DefaultChatSection /> */}
        <ChatSection sender={{ userName: "Donald" }} />
      </div>
    </Box>
  );
};

export default Home;
