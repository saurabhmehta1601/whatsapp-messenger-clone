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
  return (
    <CreateGroupSidebarLayout
      headerText="New group"
      hideFloatBtn={false}
      {...props}
    >
      <div className={styles.groupIconUpload}>
        <label
          htmlFor="uploadImg"
          style={{
            color: "black",
            height: "35vh",
            width: "35vh",
            margin: "0 auto",
            display: "grid",
            placeItems: "center",
            borderRadius: "50%",
          }}
          className={styles.label}
        >
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
    </CreateGroupSidebarLayout>
  );
};
