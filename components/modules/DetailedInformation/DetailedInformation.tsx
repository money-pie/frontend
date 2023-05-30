import React from "react";
import Image from "next/image";
import Modal from "../../elements/Modal/Modal";
import styles from "./DetailedInformation.module.css";
import Htag from "../../elements/Htag/Htag";

interface DetailedInformationProps {
  active: boolean;
  onClose: () => void;
}

function DetailedInformation({ active, onClose }: DetailedInformationProps): JSX.Element {
  const closeModal = () => {
    onClose();
  };

  return (
    <Modal active={active} closeCross="exist" onClose={closeModal}>
      <Htag className={styles.h5} tag="h5">
        Подробная информация
      </Htag>
      <div className={styles.columns}>
        <div className={styles.rows}>
          <div className={styles["img-wrap"]}>
            <Image
              src="/images/person.png"
              alt="Иконка категории: продукты"
              width={160}
              height={160}
            />
          </div>
          <div className={styles.description}>
            <p className={styles.text}>Василий Петрович</p>
            <p className={styles.info}>добавляет</p>
          </div>
        </div>

        <div className={styles.rows}>
          <div className={styles["img-wrap"]}>
            <Image
              src="/images/product.png"
              alt="Иконка категории: продукты"
              width={160}
              height={160}
            />
          </div>
          <div className={styles.description}>
            <Htag className={styles.info} tag="h3">
              Категория
            </Htag>
            <p className={styles.text}>Продукты</p>
            <Htag className={styles.info} tag="h3">
              Дата и время
            </Htag>
            <p className={styles.text}>20 февраля</p>
            <Htag className={styles.info} tag="h3">
              Описание
            </Htag>
            <p className={`${styles.text} ${styles["rich-text"]}`}>Lorem Ipsum</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default DetailedInformation;
