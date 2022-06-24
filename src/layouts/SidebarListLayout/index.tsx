import React, { ComponentPropsWithoutRef } from "react";
import styles from "./styles.module.scss";

export const SidebarListLayout = (props: ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      {...props}
      className={[styles.wrapper, props.className ?? ""].join(" ")}
    >
      {props.children}
    </div>
  );
};
