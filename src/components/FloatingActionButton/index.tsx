import { RightArrowImg } from "@Components/images/RightArrowImg";
import React, { ComponentPropsWithoutRef } from "react";
import styles from "./styles.module.scss";

export const FloatingActionButton = (
  props: ComponentPropsWithoutRef<"div">
) => {
  return (
    <div
      {...props}
      className={[styles.wrapper, props.className ?? ""].join(" ")}
    >
      <RightArrowImg />
    </div>
  );
};
