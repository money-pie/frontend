import cn from "classnames";
import React, { useState, KeyboardEvent } from "react";
import { LockElementProps } from "./LockElement.props";
import styles from "./LockElement.module.css";
import Button from "../../components/elements/Button/Button";
import LockIcon from "../LockIcon/lockIcon.svg";

function LockElement({ className, ...props }: LockElementProps): JSX.Element {
  const goToPage = () => {
    window.location.href = "/invitationPage";
  };

  return (
    <div className={cn(className, styles["lock-element"])} {...props}>
      <LockIcon />
      <Button
        appearance="casual"
        className={`${styles["custom-button"]} rounded`}
        btnType="submit"
        onClick={() => {
          goToPage();
        }}
      >
        Пригласить друга
      </Button>
    </div>
  );
}

export default LockElement;
