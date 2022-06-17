import React, { useState } from "react";
import { OTPForm } from "./OTPForm";
import { FacebookLoginButton } from "./FacebookLoginButton";
import { PhoneLoginForm } from "./PhoneLoginForm";

export const LoginForm = () => {
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [isOTPFormVisible, setIsOTPFormVisible] = useState(false);
  const [name, setName] = useState("");

  return (
    <>
      {isOTPFormVisible ? (
        <OTPForm confirmationResult={confirmationResult} userName={name} />
      ) : (
        <>
          <PhoneLoginForm
            name={name}
            setName={setName}
            setIsOTPFormVisible={setIsOTPFormVisible}
            setConfirmationResult={setConfirmationResult}
          />
          <FacebookLoginButton />
        </>
      )}
    </>
  );
};
