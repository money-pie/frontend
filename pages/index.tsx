import Head from "next/head";
import React, { useState, KeyboardEvent } from "react";
import { withLayout } from "../layout/Layout";
import { MenuItem } from "../page-components/MenuItem/MenuItem";
import { MainTarget } from "../page-components/MainTarget/MainTarget";
import DemoMode from "../page-components/DemoMode/DemoMode";
import PlusIcon from "../page-components/PlusIcon/plusIcon.svg";
import styles from "../page-components/MainTarget/PlusIcon.module.css";
import ExpenseAndIncomeWindow from "../components/modules/ExpenseAndIncomeWindow/ExpenseAndIncomeWindow";
import MainComponent from "../page-components/MainComponent/MainComponent";

function Home(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // пользователь зарегистрирован или нет
  // const userStatus = process.env.REACT_APP_USER_STATUS;

  const [showExpenseIncomeWindow, setShowExpenseIncomeWindow] = useState<boolean>(false);

  const closeModal = () => {
    setShowExpenseIncomeWindow(false);
  };

  function handleKeyDown(event: KeyboardEvent<HTMLSpanElement>) {
    if (event.key === "Enter") {
      setShowExpenseIncomeWindow(true);
    }
  }

  return (
    <>
      <MainTarget />

      <MenuItem>
        <MainComponent title="Развлечения" sum={1200}>
          19 марта 2023
        </MainComponent>
        <MainComponent title="Продукты" sum={3479}>
          19 марта 2023
        </MainComponent>
        <MainComponent title="Зарплата" sum={15000}>
          19 марта 2023
        </MainComponent>
        <MainComponent title="Транспорт" sum={118}>
          19 марта 2023
        </MainComponent>
        <MainComponent title="Продукты" sum={1000}>
          19 марта 2023
        </MainComponent>
        <MainComponent title="Продажа" sum={2450}>
          19 марта 2023
        </MainComponent>
        <MainComponent title="Здоровье" sum={1200}>
          19 марта 2023
        </MainComponent>
      </MenuItem>

      {!isLoggedIn ? null : (
        <div>
          <span
            role="button"
            className={styles["plus-icon"]}
            onClick={() => {
              setShowExpenseIncomeWindow(true);
            }}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <PlusIcon />
          </span>
          <div className={styles["custom-modal"]}>
            <ExpenseAndIncomeWindow active={showExpenseIncomeWindow} onClose={closeModal} />
          </div>
        </div>
      )}
      {isLoggedIn ? null : <DemoMode />}
    </>
  );
}

export default withLayout(Home, "hidden");
