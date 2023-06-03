import cn from "classnames";
import { useState } from "react";
import Link from "next/link";
import { SidebarProps } from "./Sidebar.props";
import styles from "./Sidebar.module.css";
import Button from "../../components/elements/Button/Button";
import CloseCrossIcon from "../../components/elements/CloseCrossIcon/closeCross.svg";
import React, { KeyboardEvent } from "react";

export function Sidebar({
  className,
  isPremiumActive = false,
  onClose,
  ...props
}: SidebarProps): JSX.Element {
  const goToPage = () => {
    window.location.href = "/subscriptionPage";
  };

  function handleKeyDown(event: KeyboardEvent<HTMLSpanElement>) {
    if (event.key === "Escape") {
      onClose();
    }
  }

  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <span
        role="button"
        className={styles["close-cross"]}
        onClick={onClose}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <CloseCrossIcon />
      </span>
      <div className={styles.menu}>
        <Link href="/profilePage">
          <a href="#">Профиль</a>
        </Link>
        <Link href="/">
          <a href="#">Главная страница</a>
        </Link>
        <Link href="/statisticsPage">
          <a href="#">Статистика</a>
        </Link>
      </div>
      <div className={styles["menu-footer"]}>
        {isPremiumActive ? null : (
          <Button
            appearance="premium"
            className={`${styles["custom-button"]} rounded`}
            btnType="button"
            onClick={() => {
              goToPage();
            }}
          >
            Премиум-подписка
          </Button>
        )}
        <a href="https://github.com/money-pie/moneypie"> Узнать о приложении</a>
      </div>
    </div>
  );
}

export default Sidebar;
