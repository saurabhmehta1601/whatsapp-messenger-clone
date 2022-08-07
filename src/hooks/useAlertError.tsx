import { useAlert } from "react-alert";

const useAlertError = () => {
  const alert = useAlert();

  return (error: any) => {
    switch (error.code) {
      case "auth/code-expired":
        alert.error("OTP expired. Please try again.");
        break;
      case "auth/invalid-verification-code":
        alert.error("Invalid OTP. Please try again.");
        break;
      default:
        alert.error(error.message);
    }
  };
};

export default useAlertError;
