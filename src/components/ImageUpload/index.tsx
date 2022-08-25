import React, { ComponentPropsWithoutRef } from "react";
import GroupIcon from "@mui/icons-material/Group";
import styles from "./styles.module.scss";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

interface IProps extends ComponentPropsWithoutRef<"div"> {
  previewSrc: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement> | null;
}

export const ImageUpload = ({
  previewSrc,
  handleImageChange,
  fileInputRef,
  ...props
}: IProps) => {
  return (
    <div
      {...props}
      className={[styles.imageUploadContainer, props.className].join(" ")}
    >
      {" "}
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
              UPLOAD <br /> IMAGE
            </p>
          </div>
        </div>
      </label>
      <input
        ref={fileInputRef}
        onChange={handleImageChange}
        type="file"
        id="uploadImg"
        name="uploadImg"
        accept="image/png, image/jpeg"
      />
    </div>
  );
};
