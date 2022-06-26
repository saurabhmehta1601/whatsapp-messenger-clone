import { useAppSelector } from "@Redux/hooks";
import { SidebarLayout } from "layouts/SidebarLayout";
import { CreateGroupSidebar } from "./CreateGroupSidebar";
import { DefaultSidebar } from "./DefaultSidebar";

export const UserSection = () => {
  const showCreateGroupSidebar = useAppSelector(
    (state) => state.createGroupSidebar.isOpen
  );
  return (
    <SidebarLayout>
      {showCreateGroupSidebar ? <CreateGroupSidebar /> : <DefaultSidebar />}
    </SidebarLayout>
  );
};
