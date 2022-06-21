import React from "react";
import { UserSection, DefaultChatSection } from "@Components/exports";
import { PageLayout, SidebarLayout, ContentLayout } from "layouts/exports";

export const ThreadPage = () => {
  return (
    <PageLayout style={{ display: "flex" }}>
      <SidebarLayout style={{ flex: 1 }}>
        <UserSection />
      </SidebarLayout>
      <ContentLayout style={{ flex: 2 }}>
        <DefaultChatSection />
      </ContentLayout>
    </PageLayout>
  );
};
