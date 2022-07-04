import { useEffect, useState } from "react";
import { RecentChatsList, ChatSearch } from "@Components/exports";
import { DocumentData } from "firebase/firestore";
import { RecentChatsHeader } from "./RecentChatsHeader";
import { getGroupByIdWithLastMessageFromFirestore } from "@Firebase/utils/db/CRUD";
import { useActiveUser } from "@Hooks/useActiveUser";

export const RecentChatsSidebar = () => {
  const activeUser = useActiveUser();
  const [activeUserGroups, setActiveUserGroups] = useState<any>([]);

  useEffect(() => {
    (async () => {
      if (activeUser) {
        // request to get all groups of active user
        const getGroupRequests: Promise<DocumentData | undefined>[] = [];
        activeUser.groupIds.forEach((id: string) => {
          getGroupRequests.push(getGroupByIdWithLastMessageFromFirestore(id));
        });
        // Promise.all resolves once all promises are resolved unlike promise.allSettled
        const groups = await Promise.all(getGroupRequests);
        setActiveUserGroups(groups.filter((group) => group != undefined));
      }
    })();
  }, [activeUser]);

  return (
    <>
      <RecentChatsHeader />
      {/* chat search */}
      <ChatSearch />
      {/* user Chats  */}
      <RecentChatsList groups={activeUserGroups} />
    </>
  );
};
