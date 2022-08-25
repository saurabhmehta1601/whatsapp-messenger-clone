import React, { ComponentPropsWithoutRef } from "react";
import styles from "./styles.module.scss";

export const PageLayout = (props: ComponentPropsWithoutRef<"div">) => {
  return (
    <div {...props} className={[styles.page, props.className ?? ""].join(" ")}>
      {props.children}
    </div>
  );
};
