import React, { useState } from "react";
import Modal from "../../elements/Modal/Modal";
import Button from "../../elements/Button/Button";
import styles from "./ExpenseAndIncomeWindow.module.css";
import Input from "../../elements/Input/Input";
import ExpenseIconsContainer from "../ExpenseIconsContainer/ExpenseIconsContainer";
import IncomeIconsContainer from "../IncomeIconsContainer/IncomeIconsContainer";
import { RuKind } from '../../../types/constants';
import { useAppContext } from '../../../context/AppContext';

interface ExpenseAndIncomeWindowProps {
  active: boolean;
  onClose: () => void;
}

function ExpenseAndIncomeWindow({ active, onClose }: ExpenseAndIncomeWindowProps): JSX.Element {
  const [activeLink, setActiveLink] = useState<RuKind>(RuKind.COSTS);
  const [sum, setSum] = useState<undefined | number>(undefined);
  const [date, setDate] = useState<undefined | string>(undefined);
  const [description, setDescription] = useState<string>("");
  const { transactionDto, updateKindDto, addTransaction } = useAppContext();

  const closeModal = () => {
    onClose();
  };

  const handleLinkClick = (linkNum: RuKind) => {
    updateKindDto(linkNum);
    setActiveLink(linkNum);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sum && date) {
      addTransaction(sum, date, description, activeLink);
    }
    onClose();
  };

  return (
    <Modal active={active} closeCross="none" onClose={closeModal}>
      <div className={styles.rows}>
        <div className={styles.row}>
          <button
            className={activeLink === RuKind.COSTS ? styles.active : ""}
            onClick={() => handleLinkClick(RuKind.COSTS)}
          >
            Добавить траты
          </button>
          <button
            className={activeLink === RuKind.INCOME ? styles.active : ""}
            onClick={() => handleLinkClick(RuKind.INCOME)}
          >
            Добавить поступления
          </button>
        </div>
      </div>
      {activeLink === RuKind.COSTS ? (
        <form onSubmit={handleSubmit} className={styles["row-input"]}>
          <Input
            required
            className={styles.input}
            type="number"
            appearance="ghost"
            value={sum}
            onChange={(e) => setSum(parseInt(e.target.value))}
            placeholder="Сумма" />
          <input
            required
            className={styles["input-date"]}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Дата" />
          <div>
            <ExpenseIconsContainer />
          </div>
          <Input
            className={styles.input}
            type="text"
            appearance="ghost"
            placeholder="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
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
              btnType="button"
              onClick={closeModal}
            >
              Закрыть
            </Button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className={styles["row-input"]}>
          <Input required
            className={styles.input}
            type="number"
            appearance="ghost"
            placeholder="Сумма"
            value={sum}
            onChange={(e) => setSum(parseInt(e.target.value))}
          />
          <input
            required
            className={styles["input-date"]}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Дата" />
          <div>
            <IncomeIconsContainer />
          </div>
          <Input
            className={styles.input}
            type="text"
            appearance="ghost"
            maxLength={80}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Описание" />
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
              btnType="button"
              onClick={closeModal}
            >
              Закрыть
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}

export default ExpenseAndIncomeWindow;
