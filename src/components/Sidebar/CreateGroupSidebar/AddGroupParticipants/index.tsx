import { UserBadge, UserCard } from "@Components/exports";
import { getAllUsers } from "@Firebase/utils/db/CRUD";
import { Stack } from "@mui/material";
import { addUserToSelectedUsers } from "@Redux/features/createGroupSidebar";
import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import { IUser } from "chat-app-types";
import { CreateGroupSidebarLayout, SidebarListLayout } from "layouts/exports";
import React, { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import styles from "./styles.module.scss";

interface IProps extends ComponentPropsWithoutRef<"div"> {
  handleNextState: () => void;
  handlePrevState: () => void;
}

export const AddGroupParticipants = (props: IProps) => {
  const activeUserId = useAppSelector((state) => state.activeUser.data?.id);
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
        const allUsers = (await getAllUsers()).filter(
          (user) => user.id !== activeUserId
        );
        setAllUsers(allUsers);
      } catch (error: any) {
        alert.error(error.message);
      }
    })();
  }, [activeUserId, alert]);
  return (
    <CreateGroupSidebarLayout
      headerText="Add group participants"
      hideFloatBtn={selectedUsers.length === 0}
      {...props}
    >
      <Stack className={styles.selectedUsers} style={{}}>
        {selectedUsers.map((user) => (
          <UserBadge user={user} />
        ))}
      </Stack>
      {allUsers.length === 0 ? (
        <div className={styles.noSuggestion}> No suggestions</div>
      ) : (
        <SidebarListLayout className={styles.sidebarListLayout}>
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
      )}
    </CreateGroupSidebarLayout>
  );
};
