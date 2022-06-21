import React, { ComponentPropsWithoutRef } from "react";
import styles from "./styles.module.scss";

export const ContentLayout = (props: ComponentPropsWithoutRef<"div">) => {
  return (
    <div {...props} className={[styles.content, props.className ?? ""].join(" ")}>
      {props.children}
    </div>
  );
};
