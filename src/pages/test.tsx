import { useActiveUser } from "@Hooks/useActiveUser";
import React from "react";

const test = () => {
  const user = useActiveUser();
  console.log("user is ", user);
  return (
    <div>
      user is <br /> <br /> {JSON.stringify(user, null, 2)}
    </div>
  );
};

export default test;
