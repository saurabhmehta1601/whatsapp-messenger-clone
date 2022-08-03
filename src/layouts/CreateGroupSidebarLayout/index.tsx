import { LeftArrowImg, FloatingActionButton } from "@Components/exports";
import { HeaderLayout, SidebarLayout } from "layouts/exports";
import React, { ComponentPropsWithoutRef } from "react";
import styles from "./styles.module.scss";
import { motion } from "framer-motion";

interface IProps extends ComponentPropsWithoutRef<"div"> {
  handleNextState?: () => void;
  handlePrevState?: () => void;
  hideFloatBtn?: boolean;
  floatBtnIcon?: React.ReactNode;
  headerText: string;
}

export const CreateGroupSidebarLayout = (props: IProps) => {
  return (
    <SidebarLayout className={styles.wrapper}>
      <HeaderLayout className={styles.createGroupSidebarHeader}>
        <motion.div
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className={styles.arrowImgContainer}
          onClick={props.handlePrevState}
        >
          <LeftArrowImg />
        </motion.div>
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className={styles.addParticipantsHeading}
        >
          {props.headerText}
        </motion.h3>
      </HeaderLayout>
      <div className={styles.children}>{props.children}</div>
      <div className={styles.btnContainer}>
        {!props.hideFloatBtn && (
          <FloatingActionButton
            onClick={props.handleNextState}
            icon={props.floatBtnIcon}
          />
        )}
      </div>
    </SidebarLayout>
  );
};
