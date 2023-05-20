import cn from "classnames";
import React, { useState, useEffect, useRef } from "react";
import { NotificationMenuProps } from "./NotificationMenu.props";
import styles from "./NotificationMenu.module.css";
import ExpenseAndIncomeWindow from "../../components/modules/ExpenseAndIncomeWindow/ExpenseAndIncomeWindow";

type ChildComponent = React.ReactElement<{ title: string }>;

function NotificationMenu({ className, children, ...props }: NotificationMenuProps): JSX.Element {
  const [activeLink, setActiveLink] = useState(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLinkClick = (linkNum: number) => {
    setActiveLink(linkNum);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const sortedChildren = React.Children.toArray(children).sort((a, b) => {
    // Определение порядка компонентов на основе заголовка
    const order = ["Подсказка", "Совет", "Уведомление"];
    const getIndex = (title: string) => order.indexOf(title);

    const aIndex = getIndex((a as ChildComponent).props.title);
    const bIndex = getIndex((b as ChildComponent).props.title);

    return aIndex - bIndex;
  });

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      // Загрузка новых данных или выполнение дополнительных действий при достижении конца скролла
      console.log("Reached the bottom of notification-menu");
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);

    // Удаляем слушатель внутри useEffect
    container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={cn(className, styles["notification-menu"])} ref={containerRef} {...props}>
      {React.Children.count(children) === 0 ? (
        <div className={styles["no-notifications"]}>Уведомлений нет</div>
      ) : (
        sortedChildren
      )}
    </div>
  );
}

export default NotificationMenu;
