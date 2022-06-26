import React, { useEffect, useState } from "react";
import { LeftArrowImg } from "@Components/exports";
import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import { HeaderLayout, SidebarLayout } from "layouts/exports";
import styles from "./styles.module.scss";
import {
  toggleCreateGroupSidebar,
  addUserToSelectedUsers,
} from "@Redux/features/createGroupSidebar";
import { IUser } from "chat-app-types";
import { getAllUsers } from "@Firebase/utils/db/CRUD";
import { UserCard } from "@Components/UserCard";
import { SidebarListLayout } from "layouts/SidebarListLayout";
import { useAlert } from "react-alert";
import { UserBadge } from "@Components/UserBadge";
import { Stack } from "@mui/material";
import { FloatingActionButton } from "@Components/FloatingActionButton";

export const CreateGroupSidebar = () => {
  const selectedUsers = useAppSelector(
    (state) => state.createGroupSidebar.selectedUsers
  );
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const dispatch = useAppDispatch();
  const alert = useAlert();

  const closeCreateGroupSidebar = () => {
    dispatch(toggleCreateGroupSidebar());
  };

  const handleUserCardClick = (user: IUser) => {
    if (!selectedUsers.some((u) => u.id === user.id)) {
      // if user not in selected list add
      dispatch(addUserToSelectedUsers(user));
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setAllUsers(await getAllUsers());
      } catch (error: any) {
        alert.error(error.message);
      }
    })();
  }, []);

  return (
    <SidebarLayout style={{ display: "flex", flexDirection: "column" }}>
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
      <Stack
        className={styles.selectedUsers}
        style={{ maxHeight: "20vh", overflowY: "scroll" }}
      >
        {selectedUsers.map((user) => (
          <UserBadge user={user} />
        ))}
      </Stack>
      <SidebarListLayout style={{ flex: 1, overflowY: "scroll" }}>
        {/* Show users which are not selected */}
        {allUsers
          .filter((u) => !selectedUsers.some((su) => su.id === u.id))
          .map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onClick={() => handleUserCardClick(user)}
            />
          ))}
      </SidebarListLayout>
      <div className={styles.btnContainer}>
        <FloatingActionButton />
      </div>
    </SidebarLayout>
  );
};
