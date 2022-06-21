import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { UserChatList } from "@Components/exports";
import { getThreadByIdWithLastMessageFromFirestore } from "@Firebase/utils/db/CRUD";
import { useActiveUser } from "@Hooks/useActiveUser";
import { Header } from "./Header";
import { ChatSearch } from "./ChatSearch";
import { SidebarLayout } from "layouts/SidebarLayout";

export const UserSection = () => {
  const [activeUserThreads, setActiveUserThreads] = useState<any>([]);
  const activeUser = useActiveUser();


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
    <SidebarLayout>
      {/* user section header */}
      <Header />
      {/* chat search */}
      <ChatSearch />
      {/* user Chats  */}
      <UserChatList threads={activeUserThreads} />
    </SidebarLayout>
  );
};
