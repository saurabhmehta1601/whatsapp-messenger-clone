import React from "react";
import { FacebookLoginButton } from "./FacebookLoginButton";
import { PhoneLoginForm } from "./PhoneLoginForm";

export const LoginForm = () => {
  return (
    <>
      <PhoneLoginForm />
      <FacebookLoginButton />
    </>
  );
};
