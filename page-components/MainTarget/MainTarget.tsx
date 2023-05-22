import cn from "classnames";
import React, { useState, KeyboardEvent } from "react";
import { MainTargetProps } from "./MainTarget.props";
import styles from "./MainTarget.module.css";
import Button from "../../components/elements/Button/Button";
import Htag from "../../components/elements/Htag/Htag";
import TargetAdding from "../../components/modules/TargetAdding/TargetAdding";

export function MainTarget({ className, ...props }: MainTargetProps): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);

  const closeModal = () => {
    setShowModal(false);
  };

  function handleKeyDown(event: KeyboardEvent<HTMLSpanElement>) {
    if (event.key === "Enter") {
      setShowModal(true);
    }
  }

  const goToPage = () => {
    window.location.href = "/statisticsPage";
  };

  return (
    <div className={cn(className, styles["main-target"])} {...props}>
      <span
        role="button"
        onClick={() => {
          setShowModal(true);
        }}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <Htag tag="h2"> Цель на месяц</Htag>
      </span>
      <div className={styles["target-row"]}>
        <div className={styles["target-line"]} />
        <Button
          appearance="ghost"
          className={`${styles["custom-button"]} rounded`}
          btnType="button"
          onClick={() => {
            goToPage();
          }}
        >
          Статистика
        </Button>
      </div>
      <TargetAdding active={showModal} onClose={closeModal} />
    </div>
  );
}

export default MainTarget;
