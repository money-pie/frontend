import cn from "classnames";
import React, { useState } from "react";
import { StatisticsItemProps } from "./StatisticsItem.props";
import styles from "./StatisticsItem.module.css";
import DonutChartIncome from "../DonutChartIncome/DonutChartIncome";
import DonutChartExpense from "../DonutChartExpense/DonutChartExpense";

function StatisticsItem({
  className,
  onCategoryChange,
  ...props
}: StatisticsItemProps): JSX.Element {
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | null>(null);
  const [selectedIncome, setSelectedIncome] = useState("Доходы");
  const [selectedMonth, setSelectedMonth] = useState("");

  const handleIncomeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // setSelectedIncome(event.target.value);
    const category = event.target.value;
    setSelectedIncome(category);
    onCategoryChange(category);
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };

  const chartDataIncome = [40, 30, 50, 60, 30];
  const chartLabelsIncome = ["Зарплата", "Награда", "Подарок", "Продажа", "Другое"];

  const chartDataExpense = [20, 40, 10, 30, 40, 50, 40, 30];
  const chartLabelsExpense = [
    "Продукты",
    "ЖКХ",
    "Развлечения",
    "Здоровье",
    "Обучение",
    "Фитнес",
    "Транспорт",
    "Налоги",
  ];

  const handleCellClick = (label: string | null) => {
    setSelectedCell(label);
    const buttonIndex = chartLabelsIncome.indexOf(label as string);
    setSelectedButtonIndex(buttonIndex);
  };

  const handleCellClickExpense = (label: string | null) => {
    setSelectedCell(label);
    const buttonIndex = chartLabelsExpense.indexOf(label as string);
    setSelectedButtonIndex(buttonIndex);
  };

  return (
    <div className={cn(className, styles["main-target"])} {...props}>
      <div className={styles["main-wrapper"]}>
        <div className={styles["donut-chart"]}>
          {selectedIncome === "Доходы" ? (
            <DonutChartIncome
              data={chartDataIncome}
              dataLabels={chartLabelsIncome}
              onCellClick={handleCellClick}
              selectedButtonIndex={selectedButtonIndex} // Передаем selectedButtonIndex
              setSelectedButton={setSelectedButtonIndex} // Обновляем setSelectedButtonIndex
            />
          ) : (
            <DonutChartExpense
              data={chartDataExpense}
              dataLabels={chartLabelsExpense}
              onCellClick={handleCellClickExpense}
              selectedButtonIndex={selectedButtonIndex}
              setSelectedButton={setSelectedButtonIndex}
            />
          )}
        </div>
        <div className={styles.category}>
          <div className={styles["category-header"]}>
            <select className={styles.select} value={selectedIncome} onChange={handleIncomeChange}>
              <option className={styles["select-item"]} value="Доходы">
                Доходы
              </option>
              <option className={styles["select-item"]} value="Расходы">
                Расходы
              </option>
            </select>
            <select className={styles.select} value={selectedMonth} onChange={handleMonthChange}>
              <option className={styles["select-item"]} value="january">
                Январь
              </option>
              <option className={styles["select-item"]} value="february">
                Февраль
              </option>
              <option className={styles["select-item"]} value="march">
                Март
              </option>
            </select>
          </div>
          <div className={styles["category-body"]}>
            {selectedIncome === "Доходы"
              ? chartLabelsIncome.map((label, index) => (
                <button
                  // key={`button-${index}`}
                  key={label}
                  onClick={() => handleCellClick(label)}
                  className={cn({ [styles.selected]: selectedCell === label })}
                >
                  {label}
                </button>
              ))
              : chartLabelsExpense.map((label, index) => (
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
