import cn from "classnames";
import React, { useState, KeyboardEvent } from "react";
import { StatisticsMenuProps } from "./StatisticsMenu.props";
import styles from "./StatisticsMenu.module.css";
import ArrowIcon from "../ArrowIcon/arrowIcon.svg";

function StatisticsMenu({ className, children, ...props }: StatisticsMenuProps): JSX.Element {
  const [activeLink, setActiveLink] = useState(1);
  const [expanded, setExpanded] = useState(false);

  const handleLinkClick = (linkNum: number) => {
    setActiveLink(linkNum);
  };

  const toggleMenu = () => {
    setExpanded(!expanded);
  };

  function handleKeyDown(event: KeyboardEvent<HTMLSpanElement>) {
    if (event.key === "Enter") {
      setExpanded(!expanded);
    }
  }

  const [showModal, setShowModal] = useState<boolean>(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={cn(className, styles.menuitem, { [styles.expanded]: expanded })} {...props}>
      <div
        role="button"
        className={styles["menuitem-header"]}
        onClick={toggleMenu}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <p>Категория</p>
        <ArrowIcon />
        <p>Сумма</p>
      </div>
      <div className={styles["menuitem-content-private"]}>
        <div className={styles["menuitem-content-wrapper"]}>{children}</div>
      </div>
    </div>
  );
}

export default StatisticsMenu;
