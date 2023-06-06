import "../styles/globals.css";
import Head from "next/head";
import React from "react";
import { AppProps } from 'next/app';
import { AppProvider } from '../context/AppContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import ym from "react-yandex-metrika"
import { Router } from 'next/router';
import { YMInitializer } from 'react-yandex-metrika';

const queryClient = new QueryClient();
Router.events.on('routeChangeComplete', (url: string) => {
  if (typeof window !== 'undefined') {
    ym('hit', url);
  }
});

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <AppProvider queryClient={queryClient}>
        <Head>
          <title>MoneyPie — приложение для ведение бюджета</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://mc.yandex.ru" />
          <link rel="icon" href="/images/favicons/logo-round.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/images/favicons/apple-icon.png" />
          <link rel="manifest" href="/manifest.webmanifest" />
        </Head>
        <YMInitializer
          accounts={[93860646]}
          options={{ webvisor: true, defer: true }}
          version="2"
        />
        <Component {...pageProps} />
      </AppProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
