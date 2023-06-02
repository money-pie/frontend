import React, { useState } from "react";
import Modal from "../../elements/Modal/Modal";
import Button from "../../elements/Button/Button";
import styles from "./ExpenseAndIncomeWindow.module.css";
import Input from "../../elements/Input/Input";
import ExpenseIconsContainer from "../ExpenseIconsContainer/ExpenseIconsContainer";
import IncomeIconsContainer from "../IncomeIconsContainer/IncomeIconsContainer";

interface ExpenseAndIncomeWindowProps {
  active: boolean;
  onClose: () => void;
}

function ExpenseAndIncomeWindow({ active, onClose }: ExpenseAndIncomeWindowProps): JSX.Element {
  const [activeLink, setActiveLink] = useState(1);

  const closeModal = () => {
    onClose();
  };

  const handleLinkClick = (linkNum: number) => {
    setActiveLink(linkNum);
  };

  return (
    <Modal active={active} closeCross="none" onClose={closeModal}>
      <div className={styles.rows}>
        <div className={styles.row}>
          <button
            className={activeLink === 1 ? styles.active : ""}
            onClick={() => handleLinkClick(1)}
          >
            Добавить траты
          </button>
          <button
            className={activeLink === 2 ? styles.active : ""}
            onClick={() => handleLinkClick(2)}
          >
            Добавить поступления
          </button>
        </div>
      </div>
      {activeLink === 1 ? (
        <div className={styles["row-input"]}>
          <Input className={styles.input} type="number" appearance="ghost" placeholder="Сумма" />
          <input className={styles["input-date"]} type="date" placeholder="Дата" />
          <div>
            <ExpenseIconsContainer />
          </div>
          <Input className={styles.input} type="text" appearance="ghost" placeholder="Описание" />
        </div>
      ) : (
        <div className={styles["row-input"]}>
          <Input className={styles.input} type="number" appearance="ghost" placeholder="Сумма" />
          <input className={styles["input-date"]} type="date" placeholder="Дата" />
          <div>
            <IncomeIconsContainer />
          </div>
          <Input className={styles.input} type="text" appearance="ghost" placeholder="Описание" />
        </div>
      )}
      <div className={styles["row-button"]}>
        <Button
          appearance="casual"
          className={`${styles["custom-button"]} rounded`}
          btnType="submit"
        >
          Сохранить
        </Button>
        <Button
          appearance="casual"
          className={`${styles["custom-button"]} rounded`}
          btnType="submit"
          onClick={closeModal}
        >
          Закрыть
        </Button>
      </div>
    </Modal>
  );
}

export default ExpenseAndIncomeWindow;
