import Head from "next/head";
import styles from "../styles/Home.module.css";
import Htag from "../components/Htag/Htag";

export default function Home(): JSX.Element {
  return (
    <div>
      <Htag tag="h1">MoneyPie</Htag>
      <Htag tag="h2">Цель на месяц</Htag>
      <Htag tag="h3">Продукты</Htag>
      <Htag tag="h4">Подсказка</Htag>
    </div>
  );
}
