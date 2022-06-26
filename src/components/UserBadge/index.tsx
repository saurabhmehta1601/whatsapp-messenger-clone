import { CrossBtnImg } from "@Components/exports";
import { Avatar } from "@mui/material";
import { removeUserFromSelectedUsers } from "@Redux/features/createGroupSidebar";
import { useAppDispatch } from "@Redux/hooks";
import { IUser } from "chat-app-types";
import React, { ComponentPropsWithoutRef } from "react";
import styles from "./styles.module.scss";

interface IProps extends ComponentPropsWithoutRef<"div"> {
  user: IUser;
}

export const UserBadge = ({ user }: IProps) => {
  const dispatch = useAppDispatch();
  
  const handleOnClick = () => {
    dispatch(removeUserFromSelectedUsers(user.id));
  };

  return (
    <div className={styles.container}>
      <Avatar
        src={user.photoURL ?? undefined}
        alt={user.displayName ?? undefined}
        className={styles.avatar}
      />
      <div>{user.displayName}</div>
      <div className={styles.crossBtnContainer} onClick={handleOnClick}>
        <CrossBtnImg />
      </div>
    </div>
  );
};
