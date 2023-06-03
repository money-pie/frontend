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
  const demo: boolean = true;

  const [showExpenseIncomeWindow, setShowExpenseIncomeWindow] = useState<boolean>(false);
  const [showDetailedInfo, setShowDetailedInfo] = useState<boolean>(false);

  const closeModal = () => {
    setShowExpenseIncomeWindow(false);
  };

  const closeInfoModal = () => {
    setShowDetailedInfo(false);
  };

  return (
    <>
      <MainTarget demo={demo} aim={user.aim}/>
      <MenuItem>
        {
          transactions.map((transaction: any) =>
            <MainComponent transaction={transaction} title={transaction.category} id={transaction.id} sum={transaction.sum}>
              {transaction.date}
            </MainComponent>
          )
        }
      </MenuItem>
      <DemoMode />
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

export default withLayout(Home, "hidden", false,);
