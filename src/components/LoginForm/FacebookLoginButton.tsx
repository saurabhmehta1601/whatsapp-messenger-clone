import React from "react";
import styles from "./styles.module.scss";
import { loginWithFacebook } from "@Firebase/utils/auth";
import { addUserToFirestoreIfNotExists } from "@Firebase/utils/db/CRUD";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";

export const FacebookLoginButton = () => {
  const router = useRouter();
  const alert = useAlert();

  const handleFacebookLogin = async () => {
    try {
      const { user } = await loginWithFacebook();
      if (user) {
        await addUserToFirestoreIfNotExists(user.uid, {
          displayName: user.displayName,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          groupIds: [],
          status: "Hey there! I am using whatsApp.",
        });
        alert.success("Logged in successfully .");
        router.push("/group");
      }
    } catch (error: any) {
      switch (error.code) {
        case "AUTH/POPUP-CLOSED-BY-USER":
          break;
        default:
          console.log(error.message);
      }
    }
  };

  return (
		<div className={styles.btnFB} onClick={handleFacebookLogin}>
			<div className={styles.FBContent}>
				<div className={styles.logo}>
					<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" version="1">
        <path fill="#FFFFFF" d="M32 30a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v28z"/>
        <path fill="#4267b2" d="M22 32V20h4l1-5h-5v-2c0-2 1.002-3 3-3h2V5h-4c-3.675 0-6 2.881-6 7v3h-4v5h4v12h5z"/>
      </svg>
				</div>
				<p>Sign in with Facebook</p>
			</div>
		</div>

  );
};
