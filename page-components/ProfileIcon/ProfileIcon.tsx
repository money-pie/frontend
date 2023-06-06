import cn from "classnames";
import React, { KeyboardEvent } from "react";
import { ProfileIconProps } from "./ProfileIcon.props";
import styles from "./ProfileIcon.module.css";
import PlusProfile from "../PlusProfile/plusProfile.svg";
import ImgProfile from "../ImgProfile/imgProfile.svg";
import MailCopy from "../MailCopy/mailCopy.svg";
import { useRouter } from 'next/router';
import { useAppContext } from '../../context/AppContext';
import { ToastContainer } from 'react-toastify';
import { showNotification } from '../../utils/notification';

function ProfileIcon({
  className,
  isPremiumActive = false,
  ...props
}: ProfileIconProps): JSX.Element {
  const router = useRouter();
  const { user, group } = useAppContext();
  let login: string = "Имя пользователя";
  let email: string = "Почта";
  if (user) {
    login = user.login;
    email = user.email;
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showNotification("E-mail сохранен в буфер обмена", "success");
      })
      .catch((error) => {
        showNotification(`Ошибка сохранения e-mail в буфер обмена: ${error.message}`, "error");
      });
  };

  const goToPage = () => {
    router.push("/invitationPage");
  };

  function handleKeyDown(event: KeyboardEvent<HTMLSpanElement>) {
    if (event.key === "Enter") {
      goToPage();
    }
  }


  const renderProfiles = () => {
    const profiles: JSX.Element[] = [];

    if (!group) {
      return null;
    }

    for (let i = 0; i < group.curCapacity - 1; i++) {
      profiles.push(
        <span
          key={i}
          className={styles["img-profile"]}>
          <ImgProfile />
        </span>
      );
    }

    return profiles;
  };

  return (
    <>
      <ToastContainer />
      <div className={cn(className, styles["profile-icon-main"])} {...props}>
        <div className={styles["row-elements"]}>
          <span className={styles["img-profile"]}>
            <ImgProfile />
          </span>
          {
            (!user?.groupId)
              ? (
                <span
                  role="button"
                  className={styles["plus-profile"]}
                  onClick={() => {
                    goToPage();
                  }}
                  onKeyDown={handleKeyDown}
                  tabIndex={0}
                >
                  <PlusProfile />
                </span>)
              :
              (
                <>
                  {renderProfiles()}
                </>
              )
          }
        </div>
        <div className={styles["profile-icon-footer"]}>
          <span>{login}</span>
          <div className={styles["footer-container"]}>
            <span>{email}</span>
            <span
              role="button"
              className={styles["mail-copy"]}
              onClick={() => {
                copyToClipboard(email);
              }}
              onKeyDown={handleKeyDown}
              tabIndex={0}
            >
              <MailCopy />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileIcon;
