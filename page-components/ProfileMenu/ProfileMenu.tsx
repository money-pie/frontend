import React, { useState, KeyboardEvent } from "react";
import cn from "classnames";
import Link from "next/link";
import { ProfileMenuProps } from "./ProfileMenu.props";
import styles from "./ProfileMenu.module.css";
import SubscriptionRenewal from "../../components/modules/SubscriptionRenewal/SubscriptionRenewal";
import QuestionModalWindow from "../../components/modules/QuestionModalWindow/QuestionModalWindow";

function ProfileMenu({
  className,
  children,
  isNotificationsEnabled,
  onToggleNotifications,
  ...props
}: ProfileMenuProps): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showQuestionModalWindowGroup, setQuestionModalWindowGroup] = useState<boolean>(false);
  const [showQuestionModalWindow, setQuestionModalWindow] = useState<boolean>(false);

  const closeModal = () => {
    setShowModal(false);
    setQuestionModalWindowGroup(false);
    setQuestionModalWindow(false);
  };

  function handleKeyDown(event: KeyboardEvent<HTMLSpanElement>) {
    if (event.key === "Enter") {
      setShowModal(true);
    }
  }

  function handleToggleNotifications() {
    onToggleNotifications();
  }

  return (
    <div className={cn(className, styles["profile-menu"])} {...props}>
      <div className={styles.menu}>
        <Link href="/profilePage">
          <a href="#" role="button" onClick={handleToggleNotifications}>
            {isNotificationsEnabled ? "Отключить уведомления" : "Включить уведомления"}
          </a>
        </Link>
        <Link href="#">
          <a
            href="#"
            role="button"
            onClick={() => {
              setShowModal(true);
            }}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            Управления подпиской
          </a>
        </Link>
        <div className={styles["custom-modal"]}>
          <SubscriptionRenewal active={showModal} onClose={closeModal} />
        </div>
        <Link href="#">
          <a
            href="#"
            role="button"
            onClick={() => {
              setQuestionModalWindowGroup(true);
            }}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            Выйти из группы
          </a>
        </Link>
        <div className={styles["custom-modal"]}>
          <QuestionModalWindow
            active={showQuestionModalWindowGroup}
            onClose={closeModal}
            text="выйти из группы?"
          />
        </div>
        <Link href="#">
          <a
            href="#"
            role="button"
            onClick={() => {
              setQuestionModalWindow(true);
            }}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            Выйти из аккаунта
          </a>
        </Link>
        <div className={styles["custom-modal"]}>
          <QuestionModalWindow
            active={showQuestionModalWindow}
            onClose={closeModal}
            text="выйти из аккаунта?"
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileMenu;
