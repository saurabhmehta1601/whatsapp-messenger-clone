import React from "react";
import { PageLayout } from "layouts/exports";
import { UserSection, DefaultChatSection } from "@Components/exports";

const Home = () => {
  return (
    <PageLayout sidebar={<UserSection />} content={<DefaultChatSection />} />
  );
};

export default Home;
