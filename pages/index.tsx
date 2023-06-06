import Head from "next/head";
import React, { useState, KeyboardEvent } from "react";
import { withLayout } from "../layout/Layout";
import { MenuItem } from "../page-components/MenuItem/MenuItem";
import { MainTarget } from "../page-components/MainTarget/MainTarget";
import DemoMode from "../page-components/DemoMode/DemoMode";
import MainComponent from "../page-components/MainComponent/MainComponent";
import { getServerURL } from '../lib/api';
import TokenGuard from '../components/guards/AuthGuard/TokenGuard';
import 'moment/locale/ru';
import Moment from 'react-moment';

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
    <TokenGuard>
      <MainTarget demo={demo} aim={user.aim} />
      <MenuItem demo={demo}>
        {
          transactions.map((transaction: any) =>
            <MainComponent transaction={transaction} title={transaction.category} id={transaction.id} sum={transaction.sum}>
              <Moment locale="ru" format="ll">
                {transaction.date}
              </Moment>
              {` ${transaction.description}`}
            </MainComponent>
          )
        }
      </MenuItem>
      <DemoMode />
    </TokenGuard>
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
