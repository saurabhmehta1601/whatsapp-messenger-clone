import { UserBadge, UserCard } from "@Components/exports";
import { getAllUsers } from "@Firebase/utils/db/CRUD";
import { Stack } from "@mui/material";
import {
  addUserToSelectedUsers,
  toggleCreateGroupSidebar,
} from "@Redux/features/createGroupSidebar";
import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import { IUser } from "chat-app-types";
import { CreateGroupSidebarLayout, SidebarListLayout } from "layouts/exports";
import React, { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import styles from "./styles.module.scss";

interface IProps extends ComponentPropsWithoutRef<"div"> {
  handleNextState: () => void;
  handlePrevState:() => void;
}

export const AddGroupParticipants = (props: IProps) => {
  const selectedUsers = useAppSelector(
    (state) => state.createGroupSidebar.selectedUsers
  );
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const dispatch = useAppDispatch();
  const alert = useAlert();

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
    <CreateGroupSidebarLayout
      headerText="Add group participants"
      hideFloatBtn={selectedUsers.length === 0}
      {...props}
    >
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
    </CreateGroupSidebarLayout>
  );
};
