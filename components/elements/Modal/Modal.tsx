import React, { KeyboardEvent } from "react";
import { ModalProps } from "./Modal.props";
import styles from "./Modal.module.css";
import CloseCrossIcon from "../CloseCrossIcon/closeCross.svg";

function ModalWindow({ children, active, closeCross = "none", onClose }: ModalProps): JSX.Element {
  function handleKeyDown(event: KeyboardEvent<HTMLSpanElement>) {
    if (event.key === "Escape") {
      onClose();
    }
  }

  return (
    <div className={active ? `${styles.modal} ${styles.active}` : styles.modal}>
      <div
        className={active ? `${styles["modal-content"]} ${styles.active}` : styles["modal-content"]}
      >
        {closeCross !== "none" && (
          <span
            role="button"
            className={styles["close-cross"]}
            onClick={onClose}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <CloseCrossIcon />
          </span>
        )}
        <div className={styles["modal-body"]}>{children}</div>
      </div>
    </div>
  );
}

export default ModalWindow;
