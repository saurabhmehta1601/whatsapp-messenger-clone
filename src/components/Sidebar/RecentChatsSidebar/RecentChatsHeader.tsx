import { StatusImg, MessageImg, DropDown, MenuImg } from "@Components/exports";
import { Avatar } from "@mui/material";
import { HeaderLayout } from "layouts/HeaderLayout";
import React from "react";
import styles from "./styles.module.scss";
import { signOutUser } from "@Firebase/utils/auth";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";
import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import { openCreateGroupSidebar } from "@Redux/features/createGroupSidebar";
import { setActiveUser } from "@Redux/features/activeUser";

export const RecentChatsHeader = () => {
  const activeUser = useAppSelector((state) => state.activeUser.data);
  const router = useRouter();
  const alert = useAlert();
  const dispatch = useAppDispatch();

  const onLogoutSelect = async () => {
    await signOutUser();
    dispatch(setActiveUser(null));

    router.replace("/");
    alert.success("Logged out successfully .");
  };

  const onNewGroupSelect = () => {
    dispatch(openCreateGroupSidebar());
  };

  return (
    <HeaderLayout>
      <Avatar
        src={activeUser?.photoURL ?? ""}
        alt={activeUser?.displayName ?? ""}
      />
      <div className={styles.iconGroup}>
        <StatusImg />
        <MessageImg />
        <DropDown
          options={[
            {
              label: "New group",
              onSelect: onNewGroupSelect,
            },
            { label: "Log out", onSelect: onLogoutSelect },
          ]}
          containerStyle={{
            position: "relative",
            bottom: "-2px",
          }}
        >
          <MenuImg />
        </DropDown>
      </div>
    </HeaderLayout>
  );
};
