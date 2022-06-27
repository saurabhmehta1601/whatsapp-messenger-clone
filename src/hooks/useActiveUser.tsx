import { auth } from "@Firebase/app";
import { getUserByIdFromFirestore } from "@Firebase/utils/db/CRUD";
import { setActiveUser } from "@Redux/features/activeUser";
import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import { IUser } from "chat-app-types";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

let activeUser: any

export const useActiveUser = () => {
  const activeUser = useAppSelector((state) => state.activeUser?.data);
  const dispatch = useAppDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        dispatch(setActiveUser(null));
      } else {
        const userId = user.uid;
        const userData = await getUserByIdFromFirestore(userId);
        dispatch(setActiveUser(userData as IUser));
      }
    });
  }, []);
  return activeUser;
};
