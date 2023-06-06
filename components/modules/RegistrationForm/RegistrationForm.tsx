import React, { useEffect, useState } from "react";
import Link from "next/link";
import Modal from "../../elements/Modal/Modal";
import Button from "../../elements/Button/Button";
import styles from "./RegistrationForm.module.css";
import Htag from "../../elements/Htag/Htag";
import Input from "../../elements/Input/Input";
import { getServerURL } from '../../../lib/api';
import { useRouter } from 'next/router';
import { ToastContainer} from "react-toastify";
import { showNotification } from '../../../utils/notification';
import { useAppContext } from '../../../context/AppContext';

interface RegistrationFormProps {
  active: boolean;
  onClose: () => void;
}

function RegistrationForm({ active, onClose }: RegistrationFormProps): JSX.Element {
  const [login, setLogin] = useState<undefined | string>(undefined);
  const [email, setEmail] = useState<undefined | string>(undefined);
  const [password, setPassword] = useState<undefined | string>(undefined);
  const [errMessage, setErrMessage] = useState<undefined | string>(undefined);
  const { reg} = useAppContext();
  const router = useRouter();

  const closeModal = () => {
    router.push("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (login && email && password) {
      reg(login, email, password)
    };
  };

  return (
    <>
    <ToastContainer />
    <Modal active={active} closeCross="exist" onClose={closeModal}>
      <Htag className={styles.h5} tag="h5">
        MoneyPie
      </Htag>
        <form onSubmit={handleSubmit} className={styles.general}>
        <div className={styles.first}>
          <Input
            id="login"
            type="text"
            appearance="normal"
            required
            placeholder="Введите имя"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <Input
            id="email"
            type="email"
            appearance="normal"
            required
            placeholder="Введите почту"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            id="password"
            type="password"
            appearance="normal"
            required
            minLength={6}
            maxLength={16}
            placeholder="Придумайте пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
      </form>
    </Modal>
    </>
  );
}

export default RegistrationForm;
