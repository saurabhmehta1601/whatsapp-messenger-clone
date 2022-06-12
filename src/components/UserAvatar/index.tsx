import React from "react";
import styles from "./styles.module.scss";

interface IProps {
  src: string;
  alt?: string;
}

export const UserAvatar = ({ src, alt }: IProps) => {
  return (
    <div className={styles.imgContainer}>
      <img src={src} alt={alt} />
    </div>
  );
};
