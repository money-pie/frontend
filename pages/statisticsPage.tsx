import React, { useEffect, useState } from "react";
import { withLayout } from "../layout/Layout";
import StatisticsMenu from "../page-components/StatisticsMenu/StatisticsMenu";
import MainComponent from "../page-components/MainComponent/MainComponent";
import StatisticsItem from "../page-components/StatisticsItem/StatisticsItem";
import DemoMode from "../page-components/DemoMode/DemoMode";
import { getServerURL } from '../lib/api';
import { Category, Kind, Month, RuCategory } from '../types/constants';
import { PieData, PieDataClass, Transaction, TransactionInfo, TransactionsInfo } from '../types/transaction.types';

function StatisticsPage(): JSX.Element {
  const [selectedKind, setSelectedKind] = useState(Kind.INCOME); // State to track the selected category
  const [selectedMonth, setSelectedMonth] = useState<string | null>(Month.MAY); // State to track the selected category
  const [selectedYear, setSelectedYear] = useState<string | null>("2023"); // State to track the selected category
  const [selectedCell, setSelectedCell] = useState<number>(-1); // State to track the selected category
  const [isLoggedIn, setIsLoggedIn] = useState(false); // пользователь зарегистрирован или нет
  const [transactionsInfo, setTransactionsInfo] = useState<TransactionInfo[]>([]); // Сохраняем данные транзакций в состоянии
  const [trn, setTransactions] = useState<Transaction[]>([]); // Сохраняем данные транзакций в состоянии


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
    fetchData();
  }, [selectedKind, selectedMonth, selectedYear]);

  async function fetchData() {
    try {
      const data = await fetchInfo(selectedKind, selectedMonth, selectedYear);
      setTransactionsInfo(data.transactionsInfo); // Сохраняем данные в состоянии
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchInfo(selectedKind: any, selectedMonth: any, selectedYear: any) {
    let response = await fetch(getServerURL(`/demo/categories-info/${true}/${selectedKind}/${selectedMonth}/${selectedYear}`));
    let r = await response.json();
    return r;
  }

  useEffect(() => {
    fetchTransactions();
  }, [selectedCell, selectedMonth, selectedYear]);

  async function fetchTransactions() {
    try {
      const data = await fetchTrnsctn(selectedCell, selectedMonth, selectedYear);
      setTransactions(data.transactions); // Сохраняем данные в состоянии
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchTrnsctn(selectedCell: any, selectedMonth: any, selectedYear: any) {
    let category = "salary";


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
    let response = await fetch(getServerURL(`/demo/sort/${true}/${category}/${selectedMonth}/${selectedYear}`));
    let r = await response.json();
    return r;
  }

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
                    {transaction.date}
                  </MainComponent>
                );
              }
            })()
          }
        </StatisticsMenu>
      </div>
      {isLoggedIn ? null : <DemoMode />}
    </>
  );
}

// export async function getServerSideProps() {
//   let user = undefined;
//   let transactions = undefined;

//   try {
//     let userResponse = await fetch(getServerURL("/demo/categories-info/{personal}/{kind}/{month}/{year}"));
//     user = await userResponse.json();

//     let transactionResponse = await fetch(getServerURL("/demo/all/true"));
//     transactions = await transactionResponse.json();
//   } catch (error) {
//     return {
//       props: {
//         user: null,
//         transactions: null,
//         // error: error,
//       },
//     };
//   }

//   return {
//     props: {
//       user: user,
//       transactions: transactions,
//     },
//   };
// }

export default withLayout(StatisticsPage, "visible");
