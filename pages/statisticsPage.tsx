import React, { useState } from "react";
import { withLayout } from "../layout/Layout";
import StatisticsMenu from "../page-components/StatisticsMenu/StatisticsMenu";
import MainComponent from "../page-components/MainComponent/MainComponent";
import StatisticsItem from "../page-components/StatisticsItem/StatisticsItem";
import DemoMode from "../page-components/DemoMode/DemoMode";

function StatisticsPage(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState("Доходы"); // State to track the selected category
  const [isLoggedIn, setIsLoggedIn] = useState(false); // пользователь зарегистрирован или нет

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <div>
        <StatisticsItem onCategoryChange={handleCategoryChange} />
        <StatisticsMenu>
          {selectedCategory === "Доходы" && (
            <>
              <MainComponent title="Зарплата" sum={1200}>
                19 марта 2023
              </MainComponent>
              <MainComponent title="Награда" sum={3479}>
                19 марта 2023
              </MainComponent>
              <MainComponent title="Подарок" sum={15000}>
                19 марта 2023
              </MainComponent>
              <MainComponent title="Продажа" sum={118}>
                19 марта 2023
              </MainComponent>
              <MainComponent title="Другое" sum={200}>
                19 марта 2023
              </MainComponent>
            </>
          )}
          {selectedCategory === "Расходы" && (
            <>
              <MainComponent title="Продукты" sum={3200}>
                19 марта 2023
              </MainComponent>
              <MainComponent title="Развлечения" sum={1800}>
                19 марта 2023
              </MainComponent>
            </>
          )}
        </StatisticsMenu>
      </div>
      {isLoggedIn ? null : <DemoMode />}
    </>
  );
}

export default withLayout(StatisticsPage, "visible");
