import cn from "classnames";
import React, { FunctionComponent, useState, KeyboardEvent, useRef } from "react";
import { LayoutProps } from "./Layout.props";
import styles from "./Layout.module.css";
import { Header } from "./Header/Header";

function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <Header visible="hidden" className={styles.header} />
      <div className={styles.body}>{children}</div>
    </div>
  );
}

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) =>
  function withLayoutComponent(props: T): JSX.Element {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };

export default withLayout;
