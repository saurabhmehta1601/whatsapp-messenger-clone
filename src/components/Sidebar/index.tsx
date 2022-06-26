import { useAppSelector } from "@Redux/hooks";
import { SidebarLayout } from "layouts/SidebarLayout";
import { CreateGroupSidebar } from "./CreateGroupSidebar";
import { RecentChatsSidebar } from "./RecentChatsSidebar";

export const UserSection = () => {
  const showCreateGroupSidebar = useAppSelector(
    (state) => state.createGroupSidebar.isOpen
  );
  return (
    <SidebarLayout>
      {showCreateGroupSidebar ? <CreateGroupSidebar /> : <RecentChatsSidebar />}
    </SidebarLayout>
  );
};
