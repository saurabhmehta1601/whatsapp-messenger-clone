import React from "react";
import { PageLayout } from "layouts/exports";
import {
  UserSection,
  DefaultChatSection,
  ChatSection,
} from "@Components/exports";
import { useAppSelector } from "@Redux/hooks";

const Home = () => {
  const { id } = useAppSelector((state) => state.activeChatGroup);
  return (
    <PageLayout>
      <div style={{ flex: 1 }}>
        <UserSection />
      </div>
      <div style={{ flex: 2 }}>
        {id ? <ChatSection /> : <DefaultChatSection />}
      </div>
    </PageLayout>
  );
};

export default Home;
