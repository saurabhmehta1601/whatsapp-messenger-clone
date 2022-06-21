import React, { ComponentPropsWithoutRef } from "react";
import styles from "./styles.module.scss";

export const SidebarLayout = (props: ComponentPropsWithoutRef<"aside">) => {
  return (
    <aside
      {...props}
      className={[styles.sidebar, props.className ?? ""].join(" ")}
    >
      {props.children}
    </aside>
  );
};
