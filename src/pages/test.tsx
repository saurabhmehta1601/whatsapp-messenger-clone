import { getMessagesInThread } from "@Firebase/utils/db";
import React, { useEffect } from "react";

const test = () => {
  useEffect(() => {
    (async () => {
      const messages = await getMessagesInThread("");
      console.log("messages are ", messages);
    })();
  });
  return <div>test</div>;
};

export default test;
