import { useEffect, useState } from "react";
import { ChatsList } from "@Components/exports";
import { DocumentData } from "firebase/firestore";
import { Header } from "./DefaultHeader";
import { getThreadByIdWithLastMessageFromFirestore } from "@Firebase/utils/db/CRUD";
import { useActiveUser } from "@Hooks/useActiveUser";
import { ChatSearch } from "../ChatSearch/ChatSearch";

export const DefaultSidebar = () => {
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
      <Header />
      {/* chat search */}
      <ChatSearch />
      {/* user Chats  */}
      <ChatsList threads={activeUserThreads} />
    </>
  );
};
