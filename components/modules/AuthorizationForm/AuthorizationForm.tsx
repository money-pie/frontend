import React, { useEffect, useState } from "react";
import Link from "next/link";
import Modal from "../../elements/Modal/Modal";
import Button from "../../elements/Button/Button";
import styles from "./AuthorizationForm.module.css";
import Htag from "../../elements/Htag/Htag";
import Input from "../../elements/Input/Input";
import { useRouter } from 'next/router';
import { getServerURL } from '../../../lib/api';
import { ToastContainer } from "react-toastify";
import { showNotification } from '../../../utils/notification';

interface AuthorizationFormProps {
  active: boolean;
  onClose: () => void;
}

function AuthorizationForm({ active, onClose }: AuthorizationFormProps): JSX.Element {
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
      const response = await fetch(getServerURL("/auth/login"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token; 

        localStorage.setItem("token", token);
        router.push("/");

        console.log(data);
      } else {
        const errorData = await response.json();
        setErrMessage(errorData.message);
        showNotification(errMessage, "error")
      }
    } catch (error: any) {
      setErrMessage(error.message);
      showNotification(errMessage, "error");
    }
  };

  return (
    <>
    <ToastContainer/>
    <Modal active={active} closeCross="exist" onClose={closeModal}>
      <Htag className={styles.h5} tag="h5">
        MoneyPie
      </Htag>
        <form onSubmit={handleSubmit} className={styles.general}>
        <div className={styles.first}>
          <Input
            type="email"
            appearance="normal"
            required
            placeholder="Введите почту"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            appearance="normal"
            required
            placeholder="Введите пароль"
            minLength={6}
            maxLength={16}
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
            Войти
          </Button>
          <Link href="/registrationPage">
            <a href="#">Еще нет аккаунта? Зарегистрируйтесь</a>
          </Link>
        </div>
      </form>
    </Modal>
    </>
  );
};

export default AuthorizationForm;
