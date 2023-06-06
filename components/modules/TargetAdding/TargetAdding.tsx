import React, { useState } from "react";
import Modal from "../../elements/Modal/Modal";
import Button from "../../elements/Button/Button";
import styles from "./TargetAdding.module.css";
import Htag from "../../elements/Htag/Htag";
import Input from "../../elements/Input/Input";
import { ToastContainer } from 'react-toastify';
import { useAppContext } from '../../../context/AppContext';

interface TargetAddingProps {
  active: boolean;
  onClose: () => void;
}

function TargetAdding({ active, onClose }: TargetAddingProps): JSX.Element {
  const [aim, setAim] = useState<number>(0);
  const [errMessage, setErrMessage] = useState<undefined | string>(undefined);
  const [token, setToken] = useState<string | null>(null);
  const { updatedUserAim } = useAppContext();

  const { user, transactionQuery, updatedGroupAim } = useAppContext();
  const closeModal = () => {
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (transactionQuery?.personal) {
      updatedUserAim(aim);
    } else if (user?.groupId) {
      updatedGroupAim(aim);
    }
    onClose();
  };

  return (
    <>
      <ToastContainer />
      <Modal active={active} closeCross="exist" onClose={closeModal}>
        <Htag className={styles.h5} tag="h5">
          Цель на месяц
        </Htag>
        <form onSubmit={handleSubmit}>
          <div className={styles.first}>
            <Input
              className={styles.input}
              type="number"
              appearance="ghost"
              placeholder="Сумма"
              required
              onChange={(e) => setAim(parseInt(e.target.value, 10))}
            />
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
        </form>
      </Modal>
    </>
  );
}

export default TargetAdding;
