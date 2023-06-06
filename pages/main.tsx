import Head from "next/head";
import React, { useState, KeyboardEvent, useEffect } from "react";
import { Layout } from "../layout/Layout";
import { MenuItem } from "../page-components/MenuItem/MenuItem";
import { MainTarget } from "../page-components/MainTarget/MainTarget";
import PlusIcon from "../page-components/PlusIcon/plusIcon.svg";
import styles from "../page-components/MainTarget/PlusIcon.module.css";
import ExpenseAndIncomeWindow from "../components/modules/ExpenseAndIncomeWindow/ExpenseAndIncomeWindow";
import MainComponent from "../page-components/MainComponent/MainComponent";
import { getServerURL } from '../lib/api';
import AuthGuard from '../components/guards/AuthGuard/AuthGuard';
import { useAppContext } from '../context/AppContext';
import { TransactionResponse } from '../types/transaction.types';
import Moment from 'react-moment';
import 'moment/locale/ru';



function Home(): JSX.Element {
  const demo: boolean = false;
  const [showExpenseIncomeWindow, setShowExpenseIncomeWindow] = useState<boolean>(false);
  const [showDetailedInfo, setShowDetailedInfo] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [transactionsLength, setTransactionsLength] = useState<number>(0);
  const { transactions, group, transactionDto, user } = useAppContext();
  const [arrTransaction, setArrTransaction] = useState<TransactionResponse[]>([]);

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
  ;


  useEffect(() => {
    const fetchTransactions = async () => {
      if (!(typeof transactionDto?.personal === 'undefined')) {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(getServerURL(`/transactions/all/${transactionDto.personal}`), {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const arrTrn: TransactionResponse[] = await response.json();
            setArrTransaction(arrTrn);
          } else {
            const errorData = await response.json();
          }
        } catch (error: any) {
        }
      }
    };

    fetchTransactions();
  }, [transactionDto?.personal, transactions]);


  return (
    <AuthGuard>
      <Layout visible={"hidden"} notifications={user?.notification}>
        <MainTarget demo={demo} />
        <MenuItem demo={demo}>
          {
            arrTransaction
              ?
              arrTransaction.map((transaction: TransactionResponse) =>
                <MainComponent transaction={transaction} title={transaction.category} id={transaction.id} sum={transaction.sum}>
                  <Moment locale="ru" format="ll">
                    {transaction.date}
                  </Moment>
                  {` ${transaction.description}`}
                </MainComponent>
              )
              :
              <></>
          }
        </MenuItem>
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
      </Layout>
    </AuthGuard>
  );
}

export default Home;
