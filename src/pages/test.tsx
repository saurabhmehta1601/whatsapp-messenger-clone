import { ChatSection } from "@Components/ChatSection";
import { CreateGroupSidebar } from "@Components/Sidebar/CreateGroupSidebar";
import { getAllUsers } from "@Firebase/utils/db/CRUD";
import { PageLayout } from "layouts/PageLayout";
import React, { useEffect, useState } from "react";

const test = () => {
  const [users, setUsers] = useState<any>([]);
  useEffect(() => {
    (async () => {
      setUsers(await getAllUsers());
    })();
  }, []);
  return (
    <PageLayout sidebar={<CreateGroupSidebar />} content={<ChatSection />} />
  );
};

export default test;
