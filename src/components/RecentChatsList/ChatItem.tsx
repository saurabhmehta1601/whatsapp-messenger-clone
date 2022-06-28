import React, { ComponentPropsWithoutRef } from "react";
import { Avatar, Container } from "@mui/material";
import { getFormattedTime } from "@Utils/time";
import { IGroupWithLastMessage, IUser } from "chat-app-types";
import styles from "./styles.module.scss";

interface IProps extends ComponentPropsWithoutRef<"div"> {
  group?: IGroupWithLastMessage;
  user?: IUser;
}

export const ChatItem = ({ group, user, ...props }: IProps) => {
  return (
    <Container
      key={group?.id || user?.id}
      className={styles.chatItem}
      {...props}
    >
      <div className={styles.avatarContainer}>
        <Avatar src={(group?.photoURL || user?.photoURL) ?? ""} />
      </div>
      <div className={styles.itemInfo}>
        <div className={styles.chatSenderAndLastMessage}>
          <div className={styles.itemTitle}>
            {(group?.name || user?.displayName) ?? "Unnamed"}
          </div>
          {group ? (
            <div className={styles.lastMessageText}>
              {group.lastMessage
                ? group.lastMessage.text.length > 20
                  ? group.lastMessage.text.substring(0, 20) + "..."
                  : group.lastMessage.text
                : "No messages"}
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
          {group &&
            group.lastMessage &&
            getFormattedTime(group.lastMessage.createdAt.seconds * 1000)}
        </div>
      </div>
    </Container>
  );
};
