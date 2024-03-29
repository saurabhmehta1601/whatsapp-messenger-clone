import React, { ComponentPropsWithRef } from "react";
import GroupIcon from "@mui/icons-material/Group";
import styles from "./styles.module.scss";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useAlert } from "react-alert";

interface IProps extends ComponentPropsWithRef<"div"> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageUpload = React.forwardRef(
  (props: IProps, ref: React.Ref<HTMLInputElement>) => {
    const [previewSrc, setPreviewSrc] = React.useState("");
    const alert = useAlert();

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      if (props.onChange) props.onChange(e);
    };
    return (
      <div
        {...props}
        className={[styles.imageUploadContainer, props.className].join(" ")}
      >
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
          ref={ref}
          onChange={onImageChange}
          type="file"
          id="uploadImg"
          name="uploadImg"
          accept="image/png, image/jpeg"
        />
      </div>
    );
  }
);

ImageUpload.displayName = "ImageUpload";
