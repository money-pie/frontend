import React, { useState } from "react";
import Link from "next/link";
import Modal from "../../elements/Modal/Modal";
import Button from "../../elements/Button/Button";
import styles from "./RegistrationForm.module.css";
import Htag from "../../elements/Htag/Htag";
import Input from "../../elements/Input/Input";

interface RegistrationFormProps {
  active: boolean;
  onClose: () => void;
}

function RegistrationForm({ active, onClose }: RegistrationFormProps): JSX.Element {
  const closeModal = () => {
    window.location.href = "/";
  };

  return (
    <Modal active={active} closeCross="exist" onClose={closeModal}>
      <Htag className={styles.h5} tag="h5">
        MoneyPie
      </Htag>
      <div className={styles.general}>
        <div className={styles.first}>
          <Input type="text" appearance="normal" placeholder="Введите имя" />
          <Input type="email" appearance="normal" placeholder="Введите почту" />
          <Input type="password" appearance="normal" placeholder="Придумайте пароль" />
        </div>
        <div className={styles.second}>
          <Button
            appearance="casual"
            className={`${styles["custom-button"]} rounded`}
            btnType="submit"
          >
            Зарегистрироваться
          </Button>
          <Link href="/authorizationPage">
            <a href="#">Уже есть аккаунт? Войдите</a>
          </Link>
        </div>
      </div>
    </Modal>
  );
}

export default RegistrationForm;
