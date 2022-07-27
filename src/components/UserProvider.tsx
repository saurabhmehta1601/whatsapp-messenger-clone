import { auth } from "@Firebase/app";
import { getUserSnapshot } from "@Firebase/utils/db/snapshots";
import { setActiveUser } from "@Redux/features/activeUser";
import { useAppDispatch } from "@Redux/hooks";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

export const ActiveUserProvider = (props: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const [loadingUser, setLoadingUser] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (() => {
      onAuthStateChanged(auth, async (authUser) => {
        if (authUser) {
          router.replace("/group");
          getUserSnapshot(authUser.uid, (snap) => {
            if (snap.exists()) {
              const userData = snap.data();
              dispatch(setActiveUser({ ...userData, id: authUser.uid }));
            }
          });
        } else {
          router.replace("/");
          dispatch(setActiveUser(null));
        }
      });
      setLoadingUser(false);
    })();
  }, [dispatch]);

  if (loadingUser) return null;
  return <>{props.children}</>;
};
