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

interface RegistrationFormProps {
  active: boolean;
  onClose: () => void;
}

function RegistrationForm({ active, onClose }: RegistrationFormProps): JSX.Element {
  const [login, setLogin] = useState<undefined | string>(undefined);
  const [email, setEmail] = useState<undefined | string>(undefined);
  const [password, setPassword] = useState<undefined | string>(undefined);
  const [errMessage, setErrMessage] = useState<undefined | string>(undefined);

  const router = useRouter();

  const closeModal = () => {
    window.location.href = "/";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(getServerURL("/auth/registration"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        localStorage.setItem("token", token);
        router.push("/");

        console.log(data);
      } else {
        const errorData = await response.json();
        setErrMessage(errorData.message)
        showNotification(errMessage, "error")

      }
    } catch (error: any) {
      setErrMessage(error.message)
      showNotification(errMessage, "error")
    }
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
