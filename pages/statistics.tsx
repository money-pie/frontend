import React, { useEffect, useState } from "react";
import { withLayout } from "../layout/Layout";
import StatisticsMenu from "../page-components/StatisticsMenu/StatisticsMenu";
import MainComponent from "../page-components/MainComponent/MainComponent";
import StatisticsItem from "../page-components/StatisticsItem/StatisticsItem";
import DemoMode from "../page-components/DemoMode/DemoMode";
import { getServerURL } from '../lib/api';
import { Category, Kind, Month, RuCategory } from '../types/constants';
import { PieData, PieDataClass, Transaction, TransactionInfo, TransactionsInfo } from '../types/transaction.types';
import { useAppContext } from '../context/AppContext';
import Moment from 'react-moment';
import 'moment/locale/ru';

function Statistics(): JSX.Element {
  const currentDate = new Date();
  const month: string = currentDate.toLocaleString("en-US", { month: "short" }).toLowerCase();
  const [selectedKind, setSelectedKind] = useState(Kind.INCOME);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(month);
  const [selectedYear, setSelectedYear] = useState<string | null>("2023");
  const [selectedCell, setSelectedCell] = useState<number>(-1);
  const [transactionsInfo, setTransactionsInfo] = useState<TransactionInfo[]>([]);
  const [trn, setTransactions] = useState<Transaction[]>([]);
  const { user, transactionQuery } = useAppContext();
  const demo: boolean = false;


  const handleKindChange = (category: string) => {
    setSelectedKind(category as Kind);
  };

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
  };

  const handleCellIndexChange = (index: number) => {
    setSelectedCell(index);
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem("token");
      if (token && user && user.id) {
        try {
          const response = await fetch(getServerURL(`/transactions/categories-info/${transactionQuery?.personal}/${selectedKind}/${selectedMonth}/${selectedYear}`), {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });


          if (response.ok) {
            const resp = await response.json();
            setTransactionsInfo(resp.transactionsInfo);
          } else {
            const errorData = await response.json();
          }
        } catch (error: any) {
        }
      }

    };

    fetchTransactions();
  }, [selectedCell, selectedMonth, selectedYear, selectedKind]);


  useEffect(() => {
    const fetchListTransactions = async () => {
      try {
        let category = "salary";
        const token = localStorage.getItem("token");


        switch (dataLabels[selectedCell]) {
          case RuCategory.PRODUCTS:
            category = Category.PRODUCTS;
            break;
          case RuCategory.ENTERTAINMENT:
            category = Category.ENTERTAINMENT;
            break;
          case RuCategory.TRANSPORT:
            category = Category.TRANSPORT;
            break;
          case RuCategory.HEALTH:
            category = Category.HEALTH;
            break;
          case RuCategory.HOME:
            category = Category.HOME;
            break;
          case RuCategory.EDUCATION:
            category = Category.EDUCATION;
            break;
          case RuCategory.FITNESS:
            category = Category.FITNESS;
            break;
          case RuCategory.TAXES:
            category = Category.TAXES;
            break;
          case RuCategory.SALARY:
            category = Category.SALARY;
            break;
          case RuCategory.REWARD:
            category = Category.REWARD;
            break;
          case RuCategory.PRESENT:
            category = Category.PRESENT;
            break;
          case RuCategory.SALES:
            category = Category.SALES;
            break;
          case RuCategory.OTHER:
            category = Category.OTHER;
            break;
        }
        const response = await fetch(getServerURL(`/transactions/sort/${transactionQuery?.personal}/${category}/${selectedMonth}/${selectedYear}`), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setTransactions(data.transactions);
      } catch (error) {

      }
    };

    fetchListTransactions();
  }, [selectedCell, selectedMonth, selectedYear, selectedKind]);

  const arrPieData: PieData[] = [];
  if (transactionsInfo) {
    for (const info of transactionsInfo) {
      arrPieData.push(new PieDataClass(info.sum, info.category));
    }
  }

  const data: number[] = [];
  const dataLabels: string[] = [];

  for (const item of arrPieData) {
    data.push(item.sum);
    dataLabels.push(item.category);
  }

  return (
    <>
      <div>
        <StatisticsItem
          onCellClickIndex={handleCellIndexChange}
          onKindChange={handleKindChange}
          onMonthChange={handleMonthChange}
          onYearChange={handleYearChange}
          demo={demo}
        />
        <StatisticsMenu>
          {

            (() => {
              if (selectedKind === Kind.INCOME && selectedCell === -1 && transactionsInfo.length > 0) {
                return transactionsInfo.map((transaction: TransactionInfo) => (
                  <MainComponent title={transaction.category} sum={transaction.sum}>
                    {`Количество пополнений: ${transaction.count}`}
                  </MainComponent>
                ));
              }
              if (selectedKind === Kind.COSTS && selectedCell === -1 && transactionsInfo.length > 0) {
                return transactionsInfo.map((transaction: TransactionInfo) => (
                  <MainComponent title={transaction.category} sum={transaction.sum}>
                    {`Количество трат: ${transaction.count}`}
                  </MainComponent>
                ));
              } if (selectedCell >= 0 && trn.length > 0) {
                return trn.map((transaction: Transaction) =>
                  <MainComponent transaction={transaction} title={transaction.category} id={transaction.id} sum={transaction.sum}>
                    <Moment locale="ru" format="ll">
                      {transaction.date}
                    </Moment>
                  </MainComponent>
                );
              }
            })()
          }
        </StatisticsMenu>
      </div>
    </>
  );
}

export default withLayout(Statistics, "visible", true);
