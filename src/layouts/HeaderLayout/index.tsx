import React, { ComponentPropsWithoutRef } from "react";
import styles from "./styles.module.scss";

export const HeaderLayout = (props: ComponentPropsWithoutRef<"header">) => {
  return (
    <header className={[styles.header, props.className ?? ""].join(" ")}>
      {props.children}
    </header>
  );
};
