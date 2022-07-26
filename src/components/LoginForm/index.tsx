import React, { useState } from "react";
import { FacebookLoginButton } from "./FacebookLoginButton";
import { PhoneLoginForm } from "./PhoneLoginForm";

export const LoginForm = () => {
  const [name, setName] = useState("");

  return (
    <>
      <PhoneLoginForm name={name} setName={setName} />
      <FacebookLoginButton />
    </>
  );
};
