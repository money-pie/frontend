import React from "react";
import Image from "next/image";
import Modal from "../../elements/Modal/Modal";
import Button from "../../elements/Button/Button";
import styles from "./FriendInvitation.module.css";
import Htag from "../../elements/Htag/Htag";
import Input from "../../elements/Input/Input";

interface FriendInvitationProps {
  active: boolean;
  onClose: () => void;
}

function FriendInvitation({ active, onClose }: FriendInvitationProps): JSX.Element {
  const closeModal = () => {
    onClose();
  };

  return (
    <Modal active={active} closeCross="exist" onClose={closeModal}>
      <div className={styles.first}>
        <Htag className={styles.h2} tag="h2">
          MoneyPie
        </Htag>
        <div className={styles["first-image"]}>
          <Image
            src="/images/addoneperson.png"
            alt="Иконка приглашения друга для совместного бюджета"
            width={210}
            height={160}
          />
        </div>
        <p>Пригласи друга для совместного бюджета</p>
        <div className={styles["around-input"]}>
          <Input
            className={styles.input}
            type="email"
            appearance="normal"
            placeholder="Введите почту друга"
          />
        </div>
        <Button
          appearance="casual"
          className={`${styles["custom-button"]} rounded`}
          btnType="submit"
        >
          Отправить
        </Button>
      </div>
    </Modal>
  );
}

export default FriendInvitation;
