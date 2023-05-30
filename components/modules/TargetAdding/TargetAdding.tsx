import React from "react";
import Modal from "../../elements/Modal/Modal";
import Button from "../../elements/Button/Button";
import styles from "./TargetAdding.module.css";
import Htag from "../../elements/Htag/Htag";
import Input from "../../elements/Input/Input";

interface TargetAddingProps {
  active: boolean;
  onClose: () => void;
}

function TargetAdding({ active, onClose }: TargetAddingProps): JSX.Element {
  const closeModal = () => {
    onClose();
  };

  return (
    <Modal active={active} closeCross="exist" onClose={closeModal}>
      <Htag className={styles.h5} tag="h5">
        Цель на месяц
      </Htag>
      <div className={styles.first}>
        <Input className={styles.input} type="number" appearance="ghost" placeholder="Сумма" />
        <p>
          Установите сумму трат, в которую бы хотели укладываться ежемесячно. Мы сообщим вам при ее
          превышении.
        </p>
      </div>
      <div className={styles["around-button"]}>
        <Button
          appearance="casual"
          className={`${styles["custom-button"]} rounded`}
          btnType="submit"
        >
          Установить
        </Button>
      </div>
    </Modal>
  );
}

export default TargetAdding;
