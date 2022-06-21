import React from "react";
import { PageLayout } from "layouts/exports";
import { UserSection, ChatSection } from "@Components/exports";

export const ThreadId = () => {
  return <PageLayout sidebar={<UserSection />} content={<ChatSection />} />;
};

export default ThreadId;
