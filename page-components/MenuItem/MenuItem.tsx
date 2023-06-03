import cn from "classnames";
import React, { useState } from "react";
import { MenuItemProps } from "./MenuItem.props";
import styles from "./MenuItem.module.css";
import ExpenseAndIncomeWindow from "../../components/modules/ExpenseAndIncomeWindow/ExpenseAndIncomeWindow";
import LockElement from "../LockElement/LockElement";

export function MenuItem({ className, children, ...props }: MenuItemProps): JSX.Element {
  const [activeLink, setActiveLink] = useState(1);

  const handleLinkClick = (linkNum: number) => {
    setActiveLink(linkNum);
  };

  const [showModal, setShowModal] = useState<boolean>(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={cn(className, styles.menuitem)} {...props}>
      <div className={styles["menuitem-header"]}>
        <button
          className={activeLink === 1 ? styles.active : ""}
          onClick={() => handleLinkClick(1)}
        >
          Личный бюджет
        </button>
        <button
          className={activeLink === 2 ? styles.active : ""}
          onClick={() => handleLinkClick(2)}
        >
          Общий бюджет
        </button>
      </div>
      {activeLink === 1 ? (
        <div className={styles["menuitem-content-private"]}>
          <div className={styles["menuitem-content-wrapper"]}>{children}</div>
        </div>
      ) : (
        <div className={styles["menuitem-content"]}>
            <LockElement/>
        </div>
      )}
      <ExpenseAndIncomeWindow active={showModal} onClose={closeModal} />
    </div>
  );
}

export default MenuItem;
