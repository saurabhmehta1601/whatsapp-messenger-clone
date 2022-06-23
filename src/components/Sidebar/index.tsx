import { useAppSelector } from "@Redux/hooks";
import { SidebarLayout } from "layouts/SidebarLayout";
import { CreateGroupSidebar } from "./CreateGroupSidebar";
import { ChatsSidebar } from "./DefaultSidebar";

export const UserSection = () => {
  const showCreateGroupSidebar = useAppSelector(
    (state) => state.ui.showCreateGroupSidebar
  );
  return (
    <SidebarLayout>
      {showCreateGroupSidebar ? <CreateGroupSidebar />: <ChatsSidebar />}
      
    </SidebarLayout>
  );
};
