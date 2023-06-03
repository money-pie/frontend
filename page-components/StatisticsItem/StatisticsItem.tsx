import cn from "classnames";
import React, { useEffect, useState } from "react";
import { StatisticsItemProps } from "./StatisticsItem.props";
import styles from "./StatisticsItem.module.css";
import DonutChartIncome from "../DonutChartIncome/DonutChartIncome";
import DonutChartExpense from "../DonutChartExpense/DonutChartExpense";
import { getServerURL } from '../../lib/api';
import { Kind, Month, MonthName } from '../../types/constants';
import { PieData, PieDataClass, TransactionsInfo } from '../../types/transaction.types';

function StatisticsItem({
  className,
  onKindChange,
  onMonthChange,
  onYearChange,
  onCellClickIndex,
  ...props
}: StatisticsItemProps): JSX.Element {
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | null>(null);
  const [selectedIncome, setSelectedIncome] = useState(Kind.INCOME);
  const [selectedMonth, setSelectedMonth] = useState("may");
  const [selectedYear, setSelectedYear] = useState("2023");
  const [transactions, setTransactions] = useState<TransactionsInfo | null>(null); // Сохраняем данные транзакций в состоянии

  useEffect(() => {
    fetchData();
  }, [selectedIncome, selectedButtonIndex, selectedMonth, selectedYear]);

  async function fetchData() {
    try {
      const data = await fetchFiltered(selectedIncome, selectedButtonIndex, selectedMonth, selectedYear);
      setTransactions(data); // Сохраняем данные в состоянии
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchFiltered(selectedIncome: any, selectedButtonIndex: any, selectedMonth: any, selectedYear: any) {
    const kind = selectedIncome;
    let response = await fetch(getServerURL(`/demo/categories-info/${true}/${kind}/${selectedMonth}/${selectedYear}`));
    let r = await response.json();
    return r;
  }

  const handleIncomeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const kind = event.target.value;
    setSelectedIncome(kind as Kind);
    onKindChange(kind);
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
    onMonthChange(event.target.value);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
    onYearChange(event.target.value);
  };

  // const chartDataIncome = [400, 30, 50, 60, 0];
  // const chartLabelsIncome = ["Зарплата", "Награда", "Подарок", "Продажа", "Другое"];

  const arrPieData: PieData[] = [];
  if (transactions) {
    for (const info of transactions.transactionsInfo) {
      arrPieData.push(new PieDataClass(info.sum, info.category));
    }
  }

  const data: number[] = [];
  const dataLabels: string[] = [];

  for (const item of arrPieData) {
    data.push(item.sum);
    dataLabels.push(item.category);
  }

  const handleCellClick = (label: string | null) => {
    setSelectedCell(label);
    const buttonIndex = dataLabels.indexOf(label as string);
    setSelectedButtonIndex(buttonIndex);
    onCellClickIndex(buttonIndex);
  };


  const handleCellClickExpense = (label: string | null) => {
    setSelectedCell(label);
    const buttonIndex = dataLabels.indexOf(label as string);
    setSelectedButtonIndex(buttonIndex);
    onCellClickIndex(buttonIndex);
  };

  return (
    <div className={cn(className, styles["main-target"])} {...props}>
      <div className={styles["main-wrapper"]}>
        <div className={styles["donut-chart"]}>
          {selectedIncome === Kind.INCOME ? (
            <DonutChartIncome
              data={data}
              dataLabels={dataLabels}
              onCellClick={handleCellClick}
              selectedButtonIndex={selectedButtonIndex} // Передаем selectedButtonIndex
              setSelectedButton={setSelectedButtonIndex}
              sum={transactions?.sum} // Обновляем setSelectedButtonIndex
            />
          ) : (
            <DonutChartExpense
              data={data}
              dataLabels={dataLabels}
              onCellClick={handleCellClick}
              selectedButtonIndex={selectedButtonIndex}
              setSelectedButton={setSelectedButtonIndex}
              sum={transactions?.sum}
            />
          )}
        </div>
        <div className={styles.category}>
          <div className={styles["category-header"]}>
            <select className={styles.select} value={selectedIncome} onChange={handleIncomeChange}>
              <option className={styles["select-item"]} value={Kind.INCOME}>
                Доходы
              </option>
              <option className={styles["select-item"]} value={Kind.COSTS}>
                Расходы
              </option>
            </select>
            <select className={styles.select} value={selectedMonth} onChange={handleMonthChange}>
              <option className={styles["select-item"]} value={Month.JANUARY}>
                {MonthName.JANUARY}
              </option>
              <option className={styles["select-item"]} value={Month.FEBRUARY}>
                {MonthName.FEBRUARY}
              </option>
              <option className={styles["select-item"]} value={Month.MARCH}>
                {MonthName.MARCH}
              </option>
              <option className={styles["select-item"]} value={Month.APRIL}>
                {MonthName.APRIL}
              </option>
              <option className={styles["select-item"]} value={Month.MAY}>
                {MonthName.MAY}
              </option>
              <option className={styles["select-item"]} value={Month.JUNE}>
                {MonthName.JUNE}
              </option>
              <option className={styles["select-item"]} value={Month.JULY}>
                {MonthName.JULY}
              </option>
              <option className={styles["select-item"]} value={Month.AUGUST}>
                {MonthName.AUGUST}
              </option>
              <option className={styles["select-item"]} value={Month.SEPTEMBER}>
                {MonthName.SEPTEMBER}
              </option>
              <option className={styles["select-item"]} value={Month.OCTOBER}>
                {MonthName.OCTOBER}
              </option>
              <option className={styles["select-item"]} value={Month.NOVEMBER}>
                {MonthName.NOVEMBER}
              </option>
              <option className={styles["select-item"]} value={Month.DECEMBER}>
                {MonthName.DECEMBER}
              </option>
            </select>
            <select className={styles.select} value={selectedYear} onChange={handleYearChange}>
              <option className={styles["select-item"]} value="2023">
                2023
              </option>
              <option className={styles["select-item"]} value="2022">
                2022
              </option>
              <option className={styles["select-item"]} value="2021">
                2021
              </option>
            </select>
          </div>
          <div className={styles["category-body"]}>
            {selectedIncome === Kind.INCOME
              ? dataLabels.map((label, index) => (
                <button
                  // key={`button-${index}`}
                  key={label}
                  onClick={() => handleCellClick(label)}
                  className={cn({ [styles.selected]: selectedCell === label })}
                >
                  {label}
                </button>
              ))
              : dataLabels.map((label, index) => (
                <button
                  // key={`button-${index}`}
                  key={label}
                  onClick={() => handleCellClickExpense(label)}
                  className={cn({ [styles["selected-expense"]]: selectedCell === label })}
                >
                  {label}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticsItem;
