import React from "react";
import Modal from "../../elements/Modal/Modal";
import Button from "../../elements/Button/Button";
import styles from "./SubscriptionRenewal.module.css";
import Htag from "../../elements/Htag/Htag";

interface SubscriptionRenewalProps {
  active: boolean;
  onClose: () => void;
}

function SubscriptionRenewal({ active, onClose }: SubscriptionRenewalProps): JSX.Element {
  const closeModal = () => {
    onClose();
  };

  return (
    <Modal active={active} closeCross="exist" onClose={closeModal}>
      <Htag className={styles.h5} tag="h5">
        MoneyPie
      </Htag>
      <div className={styles.first}>
        <p>Закончилось действие подписки?</p>
        <Button
          appearance="premium"
          className={`${styles["custom-button"]} rounded`}
          btnType="submit"
        >
          Продлить за 149р/мес
        </Button>
      </div>
      <div className={styles.second}>
        <p>Или откажитесь от подписки прямо сейчас</p>
        <Button
          appearance="ordinary"
          className={`${styles["custom-button-second"]} rounded`}
          btnType="submit"
        >
          Отказаться
        </Button>
      </div>
    </Modal>
  );
}

export default SubscriptionRenewal;
