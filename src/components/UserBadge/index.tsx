import { CrossBtnImg } from "@Components/exports";
import { Avatar } from "@mui/material";
import { removeUserFromSelectedUsers } from "@Redux/features/ui";
import { useAppDispatch } from "@Redux/hooks";
import { IUser } from "chat-app-types";
import React, { ComponentPropsWithoutRef } from "react";
import styles from "./styles.module.scss";

interface IProps extends ComponentPropsWithoutRef<"div"> {
  user: IUser;
}

export const UserBadge = ({ user }: IProps) => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.container}>
      <Avatar
        src={user.photoURL ?? undefined}
        alt={user.displayName ?? undefined}
        className={styles.avatar}
      />
      <div>{user.displayName}</div>
      <div
        className={styles.crossBtnContainer}
        onClick={() => dispatch(removeUserFromSelectedUsers(user.id))}
      >
        <CrossBtnImg />
      </div>
    </div>
  );
};
