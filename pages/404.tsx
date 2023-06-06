import React from "react";
import Htag from "../components/elements/Htag/Htag";
import Button from "../components/elements/Button/Button";
import styles from "../page-components/Errors/Error404.module.css";
import { useRouter } from 'next/router';

export function Error404(): JSX.Element {
  const router = useRouter();
  const goToPage = () => {
    router.push("/");
  };

  return (
    <div className={styles["error-column"]}>
      <img src="/images/moneypie.svg" alt="Иконка приглашения до четырех пользователей в группу" />
      <Htag tag="h6" className={styles.h6}>
        404
      </Htag>
      <p>страница не найдена</p>
      <Button
        appearance="casual"
        className={`${styles["custom-button"]} rounded`}
        btnType="submit"
        onClick={() => {
          goToPage();
        }}
      >
        Вернуться на главную
      </Button>
    </div>
  );
}

export default Error404;
