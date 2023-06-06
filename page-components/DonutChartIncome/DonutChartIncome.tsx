import React, { useEffect, useRef } from "react";
import {
  Chart,
  ArcElement,
  CategoryScale,
  Legend,
  Tooltip,
  DoughnutController,
} from "chart.js";
import styles from "./DonutChartIncome.module.css";

Chart.register(ArcElement, CategoryScale, Legend, Tooltip, DoughnutController);

type DonutChartIncomeProps = {
  data: number[];
  dataLabels: string[];
  onCellClick: (label: string | null) => void;
  selectedButtonIndex: number | null;
  setSelectedButton: (buttonIndex: number | null) => void;
  sum?: number | null;
};

type DoughnutData = {
  data: number[];
  borderColor: string;
  borderWidth: number;
  backgroundColor: string[];
  spacing: number;
  hoverOffset: number;
  hoverBorderColor: string;
  hoverBorderWidth: number;
};

function DonutChartIncome({
  data,
  dataLabels,
  onCellClick,
  selectedButtonIndex,
  setSelectedButton,
  sum,
}: DonutChartIncomeProps): JSX.Element {
  const chartRef = useRef<Chart<"doughnut"> | null>(null);

  const getChartColors = () => {
    const defaultColors = ["#F5A932", "#F5A932", "#F5A932", "#F5A932", "#F5A932"];

    const colorArrays = [
      ["#F5A932", "#141516", "#141516", "#141516", "#141516"],
      ["#141516", "#F5A932", "#141516", "#141516", "#141516"],
      ["#141516", "#141516", "#F5A932", "#141516", "#141516"],
      ["#141516", "#141516", "#141516", "#F5A932", "#141516"],
      ["#141516", "#141516", "#141516", "#141516", "#F5A932"],
    ];

    if (
      selectedButtonIndex !== null &&
      selectedButtonIndex >= 0 &&
      selectedButtonIndex < colorArrays.length
    ) {
      return colorArrays[selectedButtonIndex];
    }

    return defaultColors;
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById("donutChartCanvas") as HTMLCanvasElement;
    if (ctx) {
      chartRef.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: dataLabels,
          datasets: [
            {
              data,
              borderColor: "#F2DCBB",
              borderWidth: 2,
              backgroundColor: getChartColors(),
              spacing: 25,

              hoverOffset: 2,
              hoverBorderColor: "#F5A932",
              hoverBorderWidth: 3,
            },
          ],
        },

        options: {
          cutout: "70%",
          animation: {
            animateRotate: true,
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
            },
          },

          responsive: true,
          maintainAspectRatio: false,
          onClick: (event, elements) => {
            if (elements.length > 0 && chartRef.current?.data.labels) {
              const clickedLabel = chartRef.current.data.labels[elements[0].index];
              onCellClick(clickedLabel as string);
            } else {
              onCellClick(null);
            }
          },
        },
      });
    }
  }, [data, onCellClick]);

  useEffect(() => {
    if (chartRef.current) {
      const datasets = chartRef.current.data.datasets as DoughnutData[];
      if (datasets[0]) {
        datasets[0].backgroundColor = getChartColors();
        chartRef.current.update();
      }
    }
  }, [selectedButtonIndex]);

  const handleButtonClick = (buttonIndex: number) => {
    setSelectedButton(buttonIndex);
    onCellClick(null);
  };

  useEffect(() => {
    setSelectedButton(selectedButtonIndex);
  }, [selectedButtonIndex]);

  return (
    <div className={styles["chart-container"]}>
      <div className={styles["chart-title"]}>
        {sum
          ?
          <p>Заработано</p>
          :
          <p>Вы ничего не заработали за этот период</p>
        }

        {
          selectedButtonIndex !== null && selectedButtonIndex >= 0
            ?
            <span>{data[selectedButtonIndex]}</span>
            :
            sum
              ?
              <span>{sum}</span>
              :
              <span></span>
        }
      </div>
      <canvas id="donutChartCanvas" className={styles["chart-canvas"]} />
    </div>
  );
}

export default DonutChartIncome;
