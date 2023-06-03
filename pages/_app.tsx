import { AppProps } from "next/dist/shared/lib/router/router";
import "../styles/globals.css";
import Head from "next/head";
import React from "react";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {

  return (
    <>
      <Head>
        <title>MoneyPie — приложение для ведение бюджета</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/images/favicons/logo-round.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/images/favicons/apple-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
