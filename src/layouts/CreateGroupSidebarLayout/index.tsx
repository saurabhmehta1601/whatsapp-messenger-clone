import { LeftArrowImg, FloatingActionButton } from "@Components/exports";
import { HeaderLayout, SidebarLayout } from "layouts/exports";
import React, { ComponentPropsWithoutRef } from "react";
import styles from "./styles.module.scss";

interface IProps extends ComponentPropsWithoutRef<"div"> {
  handleNextState?: () => void;
  handlePrevState?: () => void;
  hideFloatBtn?: boolean;
  headerText: string;
}

export const CreateGroupSidebarLayout = (props: IProps) => {
  return (
    <SidebarLayout className={styles.wrapper}>
      <HeaderLayout className={styles.createGroupSidebarHeader}>
        <div
          className={styles.arrowImgContainer}
          onClick={props.handlePrevState}
        >
          <LeftArrowImg />
        </div>
        <h3 className={styles.addParticipantsHeading}>{props.headerText}</h3>
      </HeaderLayout>
      <div className={styles.children}>{props.children}</div>
      <div className={styles.btnContainer}>
        {!props.hideFloatBtn && (
          <FloatingActionButton onClick={props.handleNextState} />
        )}
      </div>
    </SidebarLayout>
  );
};
