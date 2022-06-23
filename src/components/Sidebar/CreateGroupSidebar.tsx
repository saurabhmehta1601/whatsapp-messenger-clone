import React, { useEffect, useState } from "react";
import { LeftArrowImg } from "@Components/exports";
import { useAppDispatch } from "@Redux/hooks";
import { HeaderLayout, SidebarLayout } from "layouts/exports";
import styles from "./styles.module.scss";
import { toggleCreateGroupSidebar } from "@Redux/features/ui";
import { IUser } from "chat-app-types";
import { getAllUsers } from "@Firebase/utils/db/CRUD";

export const CreateGroupSidebar = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const dispatch = useAppDispatch();
  const closeCreateGroupSidebar = () => {
    dispatch(toggleCreateGroupSidebar());
  };

  useEffect(() => {
    (async () => {
      setUsers(await getAllUsers());
    })();
  }, [users]);

  return (
    <SidebarLayout>
      <HeaderLayout className={styles.createGroupSidebarHeader}>
        <div
          className={styles.arrowImgContainer}
          onClick={closeCreateGroupSidebar}
        >
          <LeftArrowImg />
        </div>
        <h3 className={styles.addParticipantsHeading}>
          Add group participants
        </h3>
      </HeaderLayout>
      <div>
        {users.map((user) => (
          <p style={{ color: "yellow" }}>{user.displayName ?? user.id}</p>
        ))}
      </div>
    </SidebarLayout>
  );
};
