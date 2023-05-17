import cn from "classnames";
import { useState } from "react";
import Link from "next/link";
import { SidebarProps } from "./Sidebar.props";
import styles from "./Sidebar.module.css";
import Button from "../../components/elements/Button/Button";

export function Sidebar({
  className,
  isPremiumActive = false,
  ...props
}: SidebarProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const handleSidebarClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <div className={styles.menu}>
        <Link href="/">
          <a href="#">Профиль</a>
        </Link>
        <Link href="/">
          <a href="#">Главная страница</a>
        </Link>
        <Link href="/">
          <a href="#">Статистика</a>
        </Link>
      </div>
      <div className={styles["menu-footer"]}>
        {isPremiumActive ? null : (
          <Button
            appearance="premium"
            className={`${styles["custom-button"]} rounded`}
            btnType="button"
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
