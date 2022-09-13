import { auth } from "@Firebase/app";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export const useFirebaseAuth = () => {
  const [authUser, setAuthUser] = useState<any>(null);

  let listener: any = null;

  useEffect(() => {
    listener = onAuthStateChanged(auth, (activeUser) => {
      if (activeUser) {
        setAuthUser({
          id: activeUser.uid,
          displayName: activeUser.displayName,
          email: activeUser.email,
          phoneNumber: activeUser.phoneNumber,
          photoURL: activeUser.photoURL,
        });
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      if (typeof listener === "function") {
        listener();
      }
    };
  }, []);

  return authUser;
};
