import { getUserByIdFromFirestore } from "@Firebase/utils/db";
import { setActiveUser } from "@Redux/features/activeUser";
import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import { IUser } from "chat-app-types";
import { useEffect } from "react";

export const useActiveUser = () => {
  const activeUser = useAppSelector((state) => state.activeUser.data);
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      if (activeUser.id === "") {
        const user = await getUserByIdFromFirestore("krdrnG9caTRrpQeANlrC");
        dispatch(setActiveUser(user as IUser));
      }
    })();
  }, []);
  return activeUser;
};
