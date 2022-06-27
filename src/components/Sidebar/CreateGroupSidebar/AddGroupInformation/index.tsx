import { CreateGroupSidebarLayout } from "layouts/CreateGroupSidebarLayout";
import React, { ComponentPropsWithoutRef } from "react";
import styles from "./styles.module.scss";
import GroupIcon from "@mui/icons-material/Group";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
interface IProps extends ComponentPropsWithoutRef<"div"> {
  handleNextState: () => void;
  handlePrevState: () => void;
}

export const AddGroupInformation = (props: IProps) => {
  const [groupName, setGroupName] = React.useState("");
  const handleGroupSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 25) {
      setGroupName(e.target.value);
    }
  };

  return (
    <CreateGroupSidebarLayout
      headerText="New group"
      hideFloatBtn={false}
      {...props}
    >
      <div className={styles.groupIconUpload}>
        <label htmlFor="uploadImg">
          <GroupIcon className={styles.groupIcon} />
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
          value={groupName}
          onChange={handleGroupSubjectChange}
        />
      </div>
    </CreateGroupSidebarLayout>
  );
};
