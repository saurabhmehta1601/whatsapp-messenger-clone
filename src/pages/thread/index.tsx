import { Box } from "@mui/material";
import type { NextPage } from "next";
import { UserSection, DefaultChatSection } from "@Components/exports";
import styles from "@Styles/Home.module.scss";

const index: NextPage = () => {
  return (
    <Box className={styles.page}>
      <div className={styles.user}>
        <UserSection />
      </div>
      <div className={styles.chat}>
        {/* <DefaultChatSection /> */}
        <DefaultChatSection />
      </div>
    </Box>
  );
};

export default index;
