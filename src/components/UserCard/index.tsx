import React, { ComponentPropsWithoutRef } from "react";
import { Avatar, Container } from "@mui/material";
import styles from "./styles.module.scss";
import { IUser } from "chat-app-types";
import { truncateText } from "@Utils/truncateText";

interface IProps extends ComponentPropsWithoutRef<"div"> {
  user: IUser;
}

export const UserCard = ({ user, ...props }: IProps) => {
  return (
    <Container className={styles.wrapper} {...props}>
      <div className={styles.avatarContainer}>
        <Avatar src={user.photoURL ?? ""} />
      </div>
      <div className={styles.userInfo}>
        <div className={styles.displayName}>
          {user.displayName ?? "Unknown"}
        </div>
        <div className={styles.userStatus}>
          {user.status && truncateText(user.status, 35)}
        </div>
      </div>
    </Container>
  );
};
