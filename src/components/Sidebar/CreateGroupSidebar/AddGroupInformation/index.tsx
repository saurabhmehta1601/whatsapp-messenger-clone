import DoneIcon from "@mui/icons-material/Done";
import { CreateGroupSidebarLayout } from "layouts/CreateGroupSidebarLayout";
import {
  clearSelectedUsers,
  closeCreateGroupSidebar,
  setGroupSubject,
} from "@Redux/features/createGroupSidebar";
import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import { useAlert } from "react-alert";
import { createGroup } from "@Firebase/utils/db/createGroup";
import { useRouter } from "next/router";
import { ComponentPropsWithoutRef, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { motion } from "framer-motion";
import useAlertError from "@Hooks/useAlertError";
import { ImageUpload } from "@Components/ImageUpload";
interface IProps extends ComponentPropsWithoutRef<"div"> {
  handlePrevState: () => void;
}

const GROUP_NAME_LENGTH_LIMIT = 25;

export const AddGroupInformation = (props: IProps) => {

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const alert = useAlert();
  const alertError = useAlertError();

  const dispatch = useAppDispatch();
  const createGroupSidebar = useAppSelector(
    (state) => state.createGroupSidebar
  );

  const activeUserId = useAppSelector((state) => state.activeUser.data?.id);

  const groupSubject = useAppSelector(
    (state) => state.createGroupSidebar.groupSubject
  );

  const handleGroupSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= GROUP_NAME_LENGTH_LIMIT) {
      dispatch(setGroupSubject(e.target.value));
    }
  };

  const createNewGroup = async () => {
    try {
      let img = null,
        membersId: string[] = [];

      // check if group name is empty
      if (groupSubject.length === 0) {
        throw new Error("Please enter group subject");
        return;
      }

      // set group image
      if (
        fileInputRef.current?.files &&
        fileInputRef.current?.files.length > 0
      ) {
        img = {
          name: fileInputRef.current.files[0].name,
          content: fileInputRef.current.files[0],
        };
      }

      // set group members
      if (activeUserId) {
        membersId = createGroupSidebar.selectedUsers.map((user) => user.id);
        membersId.push(activeUserId);
      }

      const newGroup = {
        img,
        info: {
          name: groupSubject,
          photoURL: "",
        },
        membersId,
      };

      // create group
      console.log("creating new group");
      await createGroup(newGroup);

      // reset group information form
      dispatch(closeCreateGroupSidebar());
      dispatch(setGroupSubject(""));
      dispatch(clearSelectedUsers());

      // alert and redirect to group page
      alert.success("Group created successfully");
      router.push("/group");
    } catch (error) {
      alertError(error);
    }
  };

  const handleGroupImgChange = (e: React.ChangeEvent<HTMLInputElement>) => { };

  return (
    <CreateGroupSidebarLayout
      headerText="New group"
      hideFloatBtn={false}
      floatBtnIcon={<DoneIcon />}
      handleNextState={createNewGroup}
      {...props}
    >
      <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }}>
        <ImageUpload
          fileInputRef={fileInputRef}
        ></ImageUpload>
        <div className={styles.groupSubjectContainer}>
          <input
            type="text"
            className={styles.groupSubjectInput}
            placeholder="Group Subject"
            value={groupSubject}
            onChange={handleGroupSubjectChange}
          />
          <span className={styles.groupNameLimit}>
            {GROUP_NAME_LENGTH_LIMIT - groupSubject.length}
          </span>
        </div>
      </motion.div>
    </CreateGroupSidebarLayout>
  );
};
