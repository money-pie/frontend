import cn from "classnames";
import React, { useState, KeyboardEvent, ReactElement, ReactNode } from "react";
import { NotificationsProps } from "./Notifications.props";
import styles from "./Notifications.module.css";
import ExpenseAndIncomeWindow from "../../components/modules/ExpenseAndIncomeWindow/ExpenseAndIncomeWindow";
import Htag from "../../components/elements/Htag/Htag";
import CloseCrossIcon from "../../components/elements/CloseCrossIcon/closeCross.svg";
import { getServerURL } from '../../lib/api';
import { useAppContext } from '../../context/AppContext';

function Notifications({
  className,
  children,
  title,
  hintId,
  ...props
}: NotificationsProps): JSX.Element {
  const { deleteHint } = useAppContext();

  function handleKeyDown(event: KeyboardEvent<HTMLSpanElement>) {
    if (event.key === "Escape") {
      deleteHint(hintId);
    }
  }

  async function handleClick() {
    deleteHint(hintId);
  }

  return (
    <div className={cn(className, styles.notifications)} {...props}>
      <span
        role="button"
        className={styles["close-cross"]}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <CloseCrossIcon />
      </span>
      <Htag className={styles.h4} tag="h4">
        {title}
      </Htag>
      <div className={styles["notifications-text"]}>
        <p>{children}</p>
      </div>
    </div>
  );
}

export default Notifications;
