import React, { useState } from "react";
import Image from "next/image";
import Modal from "../../elements/Modal/Modal";
import Button from "../../elements/Button/Button";
import styles from "./FriendInvitation.module.css";
import Htag from "../../elements/Htag/Htag";
import Input from "../../elements/Input/Input";
import { useAppContext } from '../../../context/AppContext';
import { getServerURL } from '../../../lib/api';
import { Group } from '../../../types/group.types';

interface FriendInvitationProps {
  active: boolean;
  onClose: () => void;
}

function FriendInvitation({ active, onClose }: FriendInvitationProps): JSX.Element {
  const [email, setEmail,] = useState<undefined | string>(undefined);

  const {invite, updateGroup, group} = useAppContext();
  const closeModal = () => {
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(getServerURL('/groups/invite'), {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          const updatedUserGroup: Group = await response.json();
          updateGroup(updatedUserGroup);
        } else {
          const errorData = await response.json();
        }
      } catch (error: any) {
      }
      onClose();
    }
  }

  return (
    <Modal active={active} closeCross="exist" onClose={closeModal}>
      <div className={styles.first}>
        <Htag className={styles.h5} tag="h5">
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
        <form className={styles["around-input"]} onSubmit={handleSubmit}>
        <div className={styles["around-input"]}>
          <Input
            className={styles.input}
            type="email"
            appearance="normal"
            placeholder="Введите почту друга"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button
          appearance="casual"
          className={`${styles["custom-button"]} rounded`}
          btnType="submit"
        >
          Отправить
        </Button>
        </form>
      </div>
    </Modal>
  );
}

export default FriendInvitation;
