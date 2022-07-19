import React, { ComponentPropsWithoutRef, useEffect } from "react";
import { Avatar } from "@mui/material";
import { getFormattedTime } from "@Utils/time";
import { IGroup, IMessage } from "chat-app-types";
import styles from "./styles.module.scss";
import { DocumentData } from "firebase/firestore";
import { getGroupSnapshot } from "@Firebase/utils/db/snapshots";
import {
  getGroupByIdFromFirestore,
  getMessageByIdFromFirestore,
} from "@Firebase/utils/db/CRUD";

interface IProps extends ComponentPropsWithoutRef<"div"> {
  groupId: string;
}

export const ChatItem = ({ groupId, ...props }: IProps) => {
  const [lastMessage, setLastMessage] =
    React.useState<Partial<IMessage> | null>(null);
  const [group, setGroup] = React.useState<IGroup | null>(null);
  const [groupName, setGroupName] = React.useState<string>("Unnamed");
  const [groupImg, setGroupImg] = React.useState<string>("");

  useEffect(() => {
    const unsubscribe = getGroupSnapshot(groupId, async (snap) => {
      if (snap.exists()) {
        const groupData = { ...snap.data(), id: snap.id } as DocumentData;
        setGroup(groupData as IGroup);
        console.log("Doc changes are ", snap.data());
        if (groupData.lastMessageId) {
          const lastMessage = await getMessageByIdFromFirestore(
            groupData.lastMessageId
          );
          if (lastMessage) {
            setLastMessage({
              text: lastMessage.text,
              createdAt: lastMessage.createdAt,
            } as Partial<IMessage> | null);
          }
        }
      }
    });

    return () => {
      unsubscribe();
    };
    // Don't add groupId to dependency array
  }, []);

  useEffect(() => {
    (async function setIntialGroupInfo() {
      const group = await getGroupByIdFromFirestore(groupId);
      if (group) {
        setGroupName(group.name ?? "Unnamed");
        setGroupImg(group.photoURL ?? "");
      }
    })();
    // Don't add groupId to dependency array
  }, []);

  return (
    <>
      {group && (
        <div
          {...props}
          className={[styles.chatItem, props.className ?? ""].join(" ")}
        >
          <Avatar src={groupImg} className={styles.avatar} />
          <div className={styles.itemInfo}>
            <div className={styles.chatSenderAndLastMessage}>
              <div className={styles.itemTitle}>{groupName}</div>
              {group && (
                <div className={styles.lastMessageText}>
                  {lastMessage && lastMessage.text ? (
                    lastMessage.text.length > 20 ? (
                      lastMessage.text.substring(0, 20) + "..."
                    ) : (
                      lastMessage.text
                    )
                  ) : (
                    <i>&quot;No messages&quot;</i>
                  )}
                </div>
              )}
            </div>
            <div className={styles.lastMessageTime}>
              {group &&
                lastMessage &&
                getFormattedTime(lastMessage.createdAt.seconds * 1000)}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
