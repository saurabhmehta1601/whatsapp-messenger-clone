import { useEffect, useState } from "react";
import { RecentChatsList, ChatSearch } from "@Components/exports";
import { DocumentData } from "firebase/firestore";
import { RecentChatsHeader } from "./RecentChatsHeader";
import { getGroupByIdWithLastMessageFromFirestore } from "@Firebase/utils/db/CRUD";
import { useAppSelector } from "@Redux/hooks";

export const RecentChatsSidebar = () => {
  return (
    <>
      <RecentChatsHeader />
      {/* chat search */}
      <ChatSearch />
      {/* user Chats  */}
      <RecentChatsList />
    </>
  );
};
