import React, { ComponentPropsWithoutRef } from "react";
import styles from "./styles.module.scss";

export const Sidebar = (props: ComponentPropsWithoutRef<"aside">) => {
  return (
    <aside className={styles.sidebar} {...props}>
      {props.children}
    </aside>
  );
};
