import React from "react";
import Modal from "../../elements/Modal/Modal";
import Button from "../../elements/Button/Button";
import styles from "./QuestionModalWindow.module.css";

interface QuestionModalWindowProps {
  active: boolean;
  onClose: () => void;
  text: string;
}

function QuestionModalWindow({ active, onClose, text }: QuestionModalWindowProps): JSX.Element {
  const closeModal = () => {
    onClose();
  };

  return (
    <Modal active={active} closeCross="exist" onClose={closeModal}>
      <div className={styles["custom-text"]}>
        Вы уверены, что хотите <span style={{ color: "var(--accent-strong)" }}>{text}</span>
      </div>
      <div className={styles["btn-wrapper"]}>
        <Button
          appearance="ordinary"
          className={`${styles["custom-button"]} rounded`}
          btnType="submit"
        >
          Да
        </Button>
        <Button
          appearance="ordinary"
          className={`${styles["custom-button"]} rounded`}
          btnType="button"
          onClick={closeModal}
        >
          Нет
        </Button>
      </div>
    </Modal>
  );
}

export default QuestionModalWindow;
