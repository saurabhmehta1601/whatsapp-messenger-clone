import { StatusImg, MessageImg, DropDown, MenuImg } from "@Components/exports";
import { useActiveUser } from "@Hooks/useActiveUser";
import { Avatar } from "@mui/material";
import { HeaderLayout } from "layouts/HeaderLayout";
import React from "react";
import styles from "./styles.module.scss";
import { signOutUser } from "@Firebase/utils/auth";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";

export const Header = () => {
  const activeUser = useActiveUser();
  const router = useRouter();
  const alert = useAlert();

  const onLogoutSelect = async () => {
    await signOutUser();
    router.replace("/");
    alert.success("Logged out successfully .");
    console.log("redirect to / after logout ");
  };

  const onNewGroupSelect = () => {};
  return (
    <HeaderLayout className={styles.header}>
      <Avatar
        src={activeUser?.photoURL ?? ""}
        alt={activeUser?.displayName ?? ""}
      />
      <div className={styles.iconGroup}>
        <StatusImg />
        <MessageImg />
        {/* <MenuImg /> */}
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
