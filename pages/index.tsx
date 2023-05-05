import Head from "next/head";
import styles from "../styles/Home.module.css";
import Htag from "../components/Htag/Htag";
import Button from "../components/Button/Button";

export default function Home(): JSX.Element {
  return (
    <div>
      <Htag tag="h1">MoneyPie</Htag>
      <Htag tag="h2">Цель на месяц</Htag>
      <Htag tag="h3">Продукты</Htag>
      <Htag tag="h4">Подсказка</Htag>

      <Button appearance="premium" className="rounded" btnType="button">
        Купить
      </Button>
      <Button appearance="ghost" className="rounded" btnType="button">
        Статистика
      </Button>
      <Button appearance="casual" className="rounded" btnType="button">
        Установить
      </Button>
      <Button appearance="ordinary" className="rounded" btnType="button">
        Да
      </Button>
    </div>
  );
}
