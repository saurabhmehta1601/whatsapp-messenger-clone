import DoneIcon from "@mui/icons-material/Done";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import GroupIcon from "@mui/icons-material/Group";
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
    let img = null,
      membersId: string[] = [];

    // check if group name is empty
    if (groupSubject.length === 0) {
      alert.error("Please enter group subject");
      return;
    }

    // set group image
    if (fileInputRef.current?.files && fileInputRef.current?.files.length > 0) {
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
    try {
      console.log("creating new group");
      await createGroup(newGroup);
    } catch (error) {
      console.log("ERROR CREATING GROUP", error);
    }

    // reset group information form
    dispatch(closeCreateGroupSidebar());
    dispatch(setGroupSubject(""));
    dispatch(clearSelectedUsers());

    // alert and redirect to group page
    alert.success("Group created successfully");
    router.push("/group");
  };

  const handleGroupImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 1000000) {
          alert.error("File size should be less than 1MB");
          return;
        }
        const fileURL = URL.createObjectURL(file);
        setPreviewSrc(fileURL);
      } else {
        setPreviewSrc("");
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
      <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }}>
        <motion.div className={styles.groupIconUpload}>
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
        </motion.div>
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
