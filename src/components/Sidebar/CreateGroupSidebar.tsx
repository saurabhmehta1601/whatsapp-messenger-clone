import React, { useEffect, useState } from "react";
import { LeftArrowImg } from "@Components/exports";
import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import { HeaderLayout, SidebarLayout } from "layouts/exports";
import styles from "./styles.module.scss";
import {
  toggleCreateGroupSidebar,
  addUserToSelectedUsers,
} from "@Redux/features/ui";
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
    (state) => state.ui.createGroupSidebar.selectedUsers
  );
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const dispatch = useAppDispatch();
  const alert = useAlert();

  const closeCreateGroupSidebar = () => {
    dispatch(toggleCreateGroupSidebar());
  };

  const Superman = {
    id: "1",
    displayName: "Superman",
    phoneNumber: "123456789",
    photoURL: "",
    status: "Hey there I am using whatsapp",
    threadIds: [],
  };
  const Batman = {
    id: "2",
    displayName: "Batman",
    phoneNumber: "123456789",
    photoURL: "",
    status: "Hey there I am using whatsapp",
    threadIds: [],
  };

  useEffect(() => {
    (async () => {
      try {
        const fakeUsers: IUser[] = [
          Superman,
          Batman,
          Batman,
          Batman,
          Batman,
          Batman,
          Batman,
        ];
        // setUsers(await getAllUsers());
        setAllUsers(fakeUsers);
      } catch (error: any) {
        alert.error(error.message);
      }
    })();
  }, [allUsers]);

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
      <Stack className={styles.selectedUsers} style={{ maxHeight: "20vh", overflowY:"scroll" }}>
        {selectedUsers.map((user) => (
          <UserBadge user={user} />
        ))}
      </Stack>
      <SidebarListLayout style={{ flex: 1, overflowY: "scroll" }}>
        {allUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onClick={() => dispatch(addUserToSelectedUsers(user))}
          />
        ))}
      </SidebarListLayout>
      <div className={styles.btnContainer}>
        <FloatingActionButton />
      </div>
    </SidebarLayout>
  );
};
