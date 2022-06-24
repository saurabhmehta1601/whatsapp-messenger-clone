import React, { ComponentPropsWithoutRef } from "react";
import { Avatar, Container } from "@mui/material";
import { getFormattedTime } from "@Utils/time";
import { IThreadWithLastMessage, IUser } from "chat-app-types";
import styles from "./styles.module.scss";

interface IProps extends ComponentPropsWithoutRef<"div"> {
  thread?: IThreadWithLastMessage;
  user?: IUser;
}

export const ChatItem = ({ thread, user, ...props }: IProps) => {
  return (
    <Container
      key={thread?.id || user?.id}
      className={styles.chatItem}
      {...props}
    >
      <div className={styles.avatarContainer}>
        <Avatar src={(thread?.photoURL || user?.photoURL) ?? ""} />
      </div>
      <div className={styles.itemInfo}>
        <div className={styles.chatSenderAndLastMessage}>
          <div className={styles.itemTitle}>
            {(thread?.name || user?.displayName) ?? "Unnamed"}
          </div>
          {thread ? (
            <div className={styles.lastMessageText}>
              {thread.lastMessage.text.length > 20
                ? thread.lastMessage.text.substring(0, 20) + "..."
                : thread.lastMessage.text}
            </div>
          ) : (
            <div className={styles.userStatus}>
              {user &&
                (user.status && user.status?.length > 20
                  ? user.status?.substring(0, 20) + "..."
                  : user.status)}
            </div>
          )}
        </div>
        <div className={styles.lastMessageTime}>
          {thread &&
            getFormattedTime(thread.lastMessage.createdAt.seconds * 1000)}
        </div>
      </div>
    </Container>
  );
};
