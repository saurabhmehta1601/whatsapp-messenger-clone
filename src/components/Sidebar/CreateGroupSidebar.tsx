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

  useEffect(() => {
    (async () => {
      try {
        const fakeUsers: IUser[] = [
          {
            id: "1",
            displayName: "Superman",
            phoneNumber: "123456789",
            photoURL: "",
            status: "Hey there I am using whatsapp",
            threadIds: [],
          },
          {
            id: "2",
            displayName: "Batman",
            phoneNumber: "123456789",
            photoURL: "",
            status: "Hey there I am using whatsapp",
            threadIds: [],
          },
        ];
        // setUsers(await getAllUsers());
        setAllUsers(fakeUsers);
      } catch (error: any) {
        alert.error(error.message);
      }
    })();
  }, [allUsers]);

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
      <Stack className={styles.selectedUsers}>
        {selectedUsers.map((user) => (
          <UserBadge user={user} />
        ))}
      </Stack>
      <SidebarListLayout>
        {allUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onClick={() => dispatch(addUserToSelectedUsers(user))}
          />
        ))}
      </SidebarListLayout>
    </SidebarLayout>
  );
};
