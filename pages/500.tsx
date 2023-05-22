import React from "react";
import Image from "next/image";
import Htag from "../components/elements/Htag/Htag";
import Button from "../components/elements/Button/Button";
import styles from "../page-components/Errors/Error500.module.css";

export function Error500(): JSX.Element {
  const goToPage = () => {
    window.location.href = "/";
  };

  return (
    <div className={styles["error-column"]}>
      <img src="/images/moneypie.svg" alt="Иконка приглашения до четырех пользователей в группу" />
      <Htag tag="h6" className={styles.h6}>
        500
      </Htag>
      <p>Ошибка на сервере</p>
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

export default Error500;
