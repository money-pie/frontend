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
import { getServerURL } from '../lib/api';

function Home({ user, transactions }: any): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showExpenseIncomeWindow, setShowExpenseIncomeWindow] = useState<boolean>(false);
  const [showDetailedInfo, setShowDetailedInfo] = useState<boolean>(false);

  const closeModal = () => {
    setShowExpenseIncomeWindow(false);
  };

  const closeInfoModal = () => {
    setShowDetailedInfo(false);
  };

  function handleKeyDown(event: KeyboardEvent<HTMLSpanElement>) {
    if (event.key === "Enter") {
      setShowExpenseIncomeWindow(true);
    }
  }

  return (
    <>
      <MainTarget demo={!isLoggedIn} aim={user.aim}/>
      <MenuItem>
        {
          transactions.map((transaction: any) =>
            <MainComponent transaction={transaction} title={transaction.category} id={transaction.id} sum={transaction.sum}>
              {transaction.date}
            </MainComponent>
          )
        }
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

export async function getStaticProps() {
  let user = undefined;
  let transactions = undefined;

  try {
    let userResponse = await fetch(getServerURL("/demo/user"));
    user = await userResponse.json();

    let transactionResponse = await fetch(getServerURL("/demo/all/true"));
    transactions = await transactionResponse.json();
  } catch (error) {
    return {
      props: {
        user: null,
        transactions: null,
        // error: error,
      },
    };
  }

  return {
    props: {
      user: user,
      transactions: transactions,
    },
  };
}

export default withLayout(Home, "hidden");
