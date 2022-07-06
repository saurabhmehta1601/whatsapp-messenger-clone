import { CreateGroupSidebarLayout } from "layouts/CreateGroupSidebarLayout";
import React, { ComponentPropsWithoutRef, useRef, useState } from "react";
import styles from "./styles.module.scss";
import GroupIcon from "@mui/icons-material/Group";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DoneIcon from "@mui/icons-material/Done";
import {
  clearSelectedUsers,
  closeCreateGroupSidebar,
  setGroupSubject,
} from "@Redux/features/createGroupSidebar";
import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import { useAlert } from "react-alert";
import { createGroup } from "@Firebase/utils/db/createGroup";
import { useRouter } from "next/router";
interface IProps extends ComponentPropsWithoutRef<"div"> {
  handlePrevState: () => void;
}

const GROUP_NAME_LENGTH_LIMIT = 25;

export const AddGroupInformation = (props: IProps) => {
  const [previewSrc, setPreviewSrc] = useState("");

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const alert = useAlert();
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
    if (groupSubject.length === 0) {
      alert.error("Please enter group subject");
      return;
    }

    try {
      console.log("creating new group");
      if (activeUserId && fileInputRef.current && fileInputRef.current.files) {
        const files = fileInputRef.current.files;
        if (files.length === 0) {
          alert.error("please select a group image");
          return;
        }

        const file = files[0];
        const membersId = createGroupSidebar.selectedUsers.map(
          (user) => user.id
        );
        membersId.push(activeUserId);
        const groupName = createGroupSidebar.groupSubject;

        const newGroup = {
          img: {
            name: file.name,
            content: file,
          },
          info: {
            name: groupName,
            photoURL: "",
          },
          membersId,
        };

        await createGroup(newGroup);

        dispatch(closeCreateGroupSidebar());
        dispatch(setGroupSubject(""));
        dispatch(clearSelectedUsers());

        alert.success("Group created successfully");
        router.push("/group");
      } else {
        console.log("user not logged in ");
      }
    } catch (error: any) {
      alert.error(error.message);
    }
  };

  const handleGroupImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        const fileURL = URL.createObjectURL(file);
        setPreviewSrc(fileURL);
      }else{
        setPreviewSrc("")
      }
    }
  };

  return (
    <CreateGroupSidebarLayout
      headerText="New group"
      hideFloatBtn={false}
      floatBtnIcon={<DoneIcon />}
      handleNextState={createNewGroup}
      {...props}
    >
      <div className={styles.groupIconUpload}>
        <label
          htmlFor="uploadImg"
          style={previewSrc ? { backgroundImage: `url(${previewSrc})` } : {}}
        >
          {!previewSrc && <GroupIcon className={styles.groupIcon} />}
          <div className={styles.centerOverlay}>
            <div className={styles.centeredContent}>
              <div>
                <CameraAltIcon fontSize="large" />
              </div>
              <p>
                ADD GROUP <br /> ICON
              </p>
            </div>
          </div>
        </label>
        <input
          ref={fileInputRef}
          onChange={handleGroupImgChange}
          type="file"
          id="uploadImg"
          name="uploadImg"
          accept="image/png, image/jpeg"
        />
      </div>
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
    </CreateGroupSidebarLayout>
  );
};
