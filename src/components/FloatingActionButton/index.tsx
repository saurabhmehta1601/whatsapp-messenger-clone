import { RightArrowImg } from "@Components/images/RightArrowImg";
import React, { ComponentPropsWithoutRef } from "react";
import styles from "./styles.module.scss";

interface IProps extends ComponentPropsWithoutRef<"div"> {
  icon?: React.ReactNode;
}

export const FloatingActionButton = (props: IProps) => {
  return (
    <div
      {...props}
      className={[styles.wrapper, props.className ?? ""].join(" ")}
    >
      {props.icon ? props.icon : <RightArrowImg />}
    </div>
  );
};
