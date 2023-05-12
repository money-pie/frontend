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
      <Htag className={styles.h2} tag="h2">
        Подробная информация
      </Htag>
      <div className={styles.columns}>
        <div className={styles["column-wrapper"]}>
          <div className={styles.column}>
            <div className={styles["column-image"]}>
              <Image src="/images/person.png" alt="Иконка пользователя" width={160} height={160} />
            </div>
            <div className={styles["text-column"]}>
              <p>
                <span style={{ color: "var(--accent-weak)" }}>Тут имя из БД</span>
              </p>
              <p>добавляет</p>
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles["column-image"]}>
              <Image
                src="/images/product.png"
                alt="Иконка категории: продукты"
                width={160}
                height={160}
              />
            </div>
            <div className={styles["text-column"]}>
              <p>
                <span style={{ color: "var(--accent-weak)" }}>Категория:</span> из БД
              </p>
              <p>
                <span style={{ color: "var(--accent-weak)" }}>Дата и время:</span> из БД
              </p>
              <p>
                <span style={{ color: "var(--accent-weak)" }}>Описание:</span> из БД
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default DetailedInformation;
