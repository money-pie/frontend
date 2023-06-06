import React, { useState, KeyboardEvent } from "react";
import cn from "classnames";
import Link from "next/link";
import { ProfileMenuProps } from "./ProfileMenu.props";
import styles from "./ProfileMenu.module.css";
import SubscriptionRenewal from "../../components/modules/SubscriptionRenewal/SubscriptionRenewal";
import QuestionModalWindow from "../../components/modules/QuestionModalWindow/QuestionModalWindow";
import { useAppContext } from '../../context/AppContext';
import { useRouter } from 'next/router';

function ProfileMenu({
  className,
  children,
  ...props
}: ProfileMenuProps): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showQuestionModalWindowGroup, setQuestionModalWindowGroup] = useState<boolean>(false);
  const [showQuestionModalWindow, setQuestionModalWindow] = useState<boolean>(false);

  const { user, updatedUserNotification, logout, exitGroup } = useAppContext();
  let isNotificationsEnabled = true;

  if (user) {
    isNotificationsEnabled = user.notification;
  }

  const router = useRouter();

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

  const handleExitGroup = () => {
    exitGroup();
  };

  const handleLogout = () => {
    logout();
  };

  function handleToggleNotifications() {
    updatedUserNotification();
  }

  const goToPage = () => {
    router.push("/invitationPage");
  };

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
            Управление подпиской
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
              goToPage();
            }}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            Пригласить друга
          </a>
        </Link>
        {
          user?.groupId
            ?
            <>
              <Link href="#">
                <a
                  href="#"
                  role="button"
                  onClick={handleExitGroup}
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
            </>
            :
            <>
            </>
        }
        <Link href="#">
          <a
            href="#"
            role="button"
            onClick={handleLogout}
            onKeyDown={handleLogout}
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
