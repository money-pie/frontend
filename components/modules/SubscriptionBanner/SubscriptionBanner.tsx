import React, { KeyboardEvent } from "react";
import Image from "next/image";
import Modal from "../../elements/Modal/Modal";
import Button from "../../elements/Button/Button";
import styles from "./SubscriptionBanner.module.css";
import Htag from "../../elements/Htag/Htag";

interface SubscriptionBannerProps {
  active: boolean;
  onClose: () => void;
}

function SubscriptionBanner({ active, onClose }: SubscriptionBannerProps): JSX.Element {
  const closeModal = () => {
    onClose();
  };

  function handleKeyDown(event: KeyboardEvent<HTMLSpanElement>) {
    onClose();
  }

  return (
    <Modal active={active} closeCross="none" onClose={closeModal}>
      <div className={styles["banner-wrapper"]}>
        <Htag className={styles.h2} tag="h2">
          MoneyPie
        </Htag>
        <div className={styles.columns}>
          <div className={styles.column}>
            <div className={styles["column-image"]}>
              <Image
                src="/images/addfourperson.png"
                alt="Иконка приглашения до четырех пользователей в группу"
                width={207}
                height={176}
              />
            </div>
            <p>Приглашайте до четырех пользователей в группу</p>
          </div>
          <div className={styles.column}>
            <div className={styles["column-image"]}>
              <Image
                src="/images/category.png"
                alt="Иконка безлимитного количества категорий"
                width={185}
                height={176}
              />
            </div>
            <p>Доступно безлимитное количество категорий</p>
          </div>
        </div>
        <Button
          appearance="premium"
          className={`${styles["custom-button"]} rounded`}
          btnType="submit"
        >
          Купить за 149р/мес
        </Button>
        <button className={styles.button} onClick={closeModal} onKeyDown={handleKeyDown}>
          Оформить подписку позже
        </button>
      </div>
    </Modal>
  );
}

export default SubscriptionBanner;
