import cn from "classnames";
import React, { useState, KeyboardEvent } from "react";
import Image from "next/image";
import { MainTargetProps } from "./MainTarget.props";
import styles from "./MainTarget.module.css";
import Button from "../../components/elements/Button/Button";
import Htag from "../../components/elements/Htag/Htag";
import TargetAdding from "../../components/modules/TargetAdding/TargetAdding";
import ExpenseAndIncomeWindow from "../../components/modules/ExpenseAndIncomeWindow/ExpenseAndIncomeWindow";
import PlusIcon from "../PlusIcon/plusIcon.svg";

export function MainTarget({ className, ...props }: MainTargetProps): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showExpenseIncomeWindow, setShowExpenseIncomeWindow] = useState<boolean>(false);

  const closeModal = () => {
    setShowModal(false);
    setShowExpenseIncomeWindow(false);
  };

  function handleKeyDown(event: KeyboardEvent<HTMLSpanElement>) {
    if (event.key === "Enter") {
      setShowModal(true);
    }
  }

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
        >
          Статистика
        </Button>
      </div>
      <TargetAdding active={showModal} onClose={closeModal} />
      <span
        role="button"
        className={styles["plus-icon"]}
        onClick={() => {
          setShowExpenseIncomeWindow(true);
        }}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <PlusIcon />
      </span>
      <ExpenseAndIncomeWindow active={showExpenseIncomeWindow} onClose={closeModal} />
    </div>
  );
}

export default MainTarget;
