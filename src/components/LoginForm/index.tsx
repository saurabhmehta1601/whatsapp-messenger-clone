import React, { useState } from "react";
import { OTPForm } from "./OTPForm";
import { FacebookLoginButton } from "./FacebookLoginButton";
import { PhoneLoginForm } from "./PhoneLoginForm";

export const LoginForm = () => {
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [isOTPFormVisible, setIsOTPFormVisible] = useState(false);

  return (
    <>
      {isOTPFormVisible ? (
        <OTPForm confirmationResult={confirmationResult} />
      ) : (
        <>
          <PhoneLoginForm
            setIsOTPFormVisible={setIsOTPFormVisible}
            setConfirmationResult={setConfirmationResult}
          />
          <FacebookLoginButton />
        </>
      )}
    </>
  );
};
