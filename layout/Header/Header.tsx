import React, { KeyboardEvent, useEffect, useState } from "react";
import cn from "classnames";
import { HeaderProps } from "./Header.props";
import styles from "./Header.module.css";
import Logo from "../logo.svg";
import Htag from "../../components/elements/Htag/Htag";
import IconBell from "./IconBell/iconBell.svg";
import IconBurgerMenu from "./IconBurgerMenu/iconBurgerMenu.svg";
import { Sidebar } from "../Sidebar/Sidebar";

export function Header({ visible, className, ...props }: HeaderProps): JSX.Element {
  const isPremiumActive = false; // сюда передаем наше состояние о подписке

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleBellClick = () => {
    // Выполнить переход на другую страницу при клике на колокольчик
    window.location.href = "/notificationPage";
  };

  const handleBurgerClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  function handleKeyDownForBurger(event: KeyboardEvent<HTMLSpanElement>) {
    if (event.key === "Enter") {
      handleBurgerClick();
    }
  }

  function handleKeyDownForBell(event: KeyboardEvent<HTMLSpanElement>) {
    if (event.key === "Enter") {
      handleBellClick();
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const sidebar = document.getElementById("sidebar");
      if (sidebar && !sidebar.contains(target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  return (
    <header
      className={cn(className, styles.header, {
        [styles.visible]: visible === "visible",
        [styles.hidden]: visible === "hidden",
      })}
      {...props}
    >
      <span
        role="button"
        className={styles["left-burger"]}
        onClick={handleBurgerClick}
        onKeyDown={handleKeyDownForBurger}
        tabIndex={0}
      >
        <IconBurgerMenu />
      </span>
      <div className={styles["sidebar-header"]}>
        <div
          id="sidebar"
          className={cn(styles.sidebar, { [styles["sidebar-open"]]: isSidebarOpen })}
        >
          <Sidebar isPremiumActive={isPremiumActive} />
        </div>
        {isSidebarOpen && (
          <div
            className={styles["is-sidebar-open"]}
            onClick={() => setIsSidebarOpen(false)}
            role="button"
            onKeyDown={handleKeyDownForBurger}
            tabIndex={0}
          >
            Закрыть
          </div>
        )}
      </div>
      <Htag className={styles.h1} tag="h1">
        MoneyPie
      </Htag>
      <span
        role="button"
        className={styles["right-bell"]}
        onClick={handleBellClick}
        onKeyDown={handleKeyDownForBell}
        tabIndex={0}
      >
        <IconBell />
      </span>
    </header>
  );
}

export default Header;
