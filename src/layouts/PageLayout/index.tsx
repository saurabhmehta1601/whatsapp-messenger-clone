import { ContentLayout, SidebarLayout } from "layouts/exports";
import React, { ComponentPropsWithoutRef } from "react";
import styles from "./styles.module.scss";

interface IProps extends ComponentPropsWithoutRef<"div"> {
  sidebar: React.ReactNode;
  content: React.ReactNode;
}

export const PageLayout = (props: IProps) => {
  return (
    <div {...props} className={[styles.page, props.className ?? ""].join(" ")}>
      <SidebarLayout style={{ flex: 1 }}>{props.sidebar}</SidebarLayout>
      <ContentLayout style={{ flex: 2 }}>{props.content}</ContentLayout>
    </div>
  );
};
