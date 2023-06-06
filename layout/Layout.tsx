import React, { FunctionComponent, useState, KeyboardEvent, useRef } from "react";
import { LayoutProps } from "./Layout.props";
import styles from "./Layout.module.css";
import { Header } from "./Header/Header";

export function Layout({ children, visible, notifications }: LayoutProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <Header notifications={notifications} visible={visible} className={styles.header} />
      <div className={styles.body}>{children}</div>
    </div>
  );
}

export const withLayout = <T extends Record<string, unknown>>(
  Component: FunctionComponent<T>,
  visible: "visible" | "hidden",
  notifications: boolean,
) =>
  function withLayoutComponent(props: T): JSX.Element {
    return (
      <Layout visible={visible} notifications={notifications}>
        <Component {...props} />
      </Layout>
    );
  };
