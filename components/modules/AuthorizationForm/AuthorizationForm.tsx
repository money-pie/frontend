import React, { useState } from "react";
import Link from "next/link";
import Modal from "../../elements/Modal/Modal";
import Button from "../../elements/Button/Button";
import styles from "./AuthorizationForm.module.css";
import Htag from "../../elements/Htag/Htag";
import Input from "../../elements/Input/Input";

interface AuthorizationFormProps {
  active: boolean;
  onClose: () => void;
}

function AuthorizationForm({ active, onClose }: AuthorizationFormProps): JSX.Element {
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
          <Input type="email" appearance="normal" placeholder="Введите почту" />
          <Input type="password" appearance="normal" placeholder="Введите пароль" />
        </div>
        <div className={styles.second}>
          <Button
            appearance="casual"
            className={`${styles["custom-button"]} rounded`}
            btnType="submit"
          >
            Войти
          </Button>
          <Link href="/registrationPage">
            <a href="#">Еще нет аккаунта? Зарегистрируйтесь</a>
          </Link>
        </div>
      </div>
    </Modal>
  );
}

export default AuthorizationForm;
