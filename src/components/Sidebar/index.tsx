import { useAppSelector } from "@Redux/hooks";
import { CreateGroupSidebar } from "./CreateGroupSidebar";
import { RecentChatsSidebar } from "./RecentChatsSidebar";
import styles from "./styles.module.scss";

export const UserSection = () => {
  const showCreateGroupSidebar = useAppSelector(
    (state) => state.createGroupSidebar.isOpen
  );
  return (
    <div className={styles.wrapper}>
      {showCreateGroupSidebar ? <CreateGroupSidebar /> : <RecentChatsSidebar />}
    </div>
  );
};
