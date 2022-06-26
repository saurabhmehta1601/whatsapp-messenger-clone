import { useEffect, useState } from "react";
import { RecentChatsList, ChatSearch } from "@Components/exports";
import { DocumentData } from "firebase/firestore";
import { RecentChatsHeader } from "./RecentChatsHeader";
import { getThreadByIdWithLastMessageFromFirestore } from "@Firebase/utils/db/CRUD";
import { useActiveUser } from "@Hooks/useActiveUser";

export const RecentChatsSidebar = () => {
  const activeUser = useActiveUser();
  const [activeUserThreads, setActiveUserThreads] = useState<any>([]);

  useEffect(() => {
    (async () => {
      if (activeUser) {
        // request to get all threads of active user
        const getThreadRequests: Promise<DocumentData | undefined>[] = [];
        activeUser.threadIds.forEach((id: string) => {
          getThreadRequests.push(getThreadByIdWithLastMessageFromFirestore(id));
        });
        // Promise.all resolves once all promises are resolved unlike promise.allSettled
        const threads = await Promise.all(getThreadRequests);
        setActiveUserThreads(threads);
      }
    })();
  }, [activeUser]);

  return (
    <>
      <RecentChatsHeader />
      {/* chat search */}
      <ChatSearch />
      {/* user Chats  */}
      <RecentChatsList threads={activeUserThreads} />
    </>
  );
};
