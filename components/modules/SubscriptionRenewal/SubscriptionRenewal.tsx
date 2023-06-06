import React from "react";
import Modal from "../../elements/Modal/Modal";
import Button from "../../elements/Button/Button";
import styles from "./SubscriptionRenewal.module.css";
import Htag from "../../elements/Htag/Htag";
import { useAppContext } from '../../../context/AppContext';

interface SubscriptionRenewalProps {
  active: boolean;
  onClose: () => void;
}

function SubscriptionRenewal({ active, onClose }: SubscriptionRenewalProps): JSX.Element {
  const closeModal = () => {
    onClose();
  };

  const {createSub, unSub} = useAppContext();

  const handleUnSub = () => {
    unSub();
    onClose();
  }

  const handleSub = () => {
    createSub();
    onClose();
  }


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
          onClick={handleSub}
        >
          Продлить за 149р/мес
        </Button>
      </div>
      <div className={styles.second}>
        <p>Или откажитесь от подписки прямо сейчас</p>
        <Button
          appearance="ordinary"
          className={`${styles["custom-button-second"]} rounded`}
          onClick={handleUnSub}
          btnType="submit"
        >
          Отказаться
        </Button>
      </div>
    </Modal>
  );
}

export default SubscriptionRenewal;
