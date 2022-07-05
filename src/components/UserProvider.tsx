import { auth } from "@Firebase/app";
import { getUserByIdFromFirestore } from "@Firebase/utils/db/CRUD";
import { setActiveUser } from "@Redux/features/activeUser";
import { useAppDispatch } from "@Redux/hooks";
import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";

export const ActiveUserProvider = (props: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    (() => {
      onAuthStateChanged(auth, async (authUser) => {
        let user = null;
        if (authUser) {
          user = (await getUserByIdFromFirestore(authUser.uid)) ?? null;
        }
        dispatch(setActiveUser(user));
      });
      setLoadingUser(false);
    })();
  }, []);

  if (loadingUser) return null;
  return <>{props.children}</>;
};
