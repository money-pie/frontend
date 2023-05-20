import cn from "classnames";
import React, { useState, KeyboardEvent } from "react";
import Image from "next/image";
import { ProfileIconProps } from "./ProfileIcon.props";
import styles from "./ProfileIcon.module.css";
import Button from "../../components/elements/Button/Button";
import Htag from "../../components/elements/Htag/Htag";
import TargetAdding from "../../components/modules/TargetAdding/TargetAdding";
import ExpenseAndIncomeWindow from "../../components/modules/ExpenseAndIncomeWindow/ExpenseAndIncomeWindow";
import PlusProfile from "../PlusProfile/plusProfile.svg";
import PremiumPlusProfile from "../PremiumPlusProfile/premiumPlusProfile.svg";
import ImgProfile from "../ImgProfile/imgProfile.svg";
import MailCopy from "../MailCopy/mailCopy.svg";
import FriendInvitation from "../../components/modules/FriendInvitation/FriendInvitation";

function ProfileIcon({
  className,
  isPremiumActive = false,
  ...props
}: ProfileIconProps): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [copiedText, setCopiedText] = useState<string>("Почта"); // сюда передаем нашу почту, чтобы скопировать

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Текст сохранен в буфер обмена");
      })
      .catch((error) => {
        console.error("Ошибка сохранения текста в буфер обмена:", error);
      });
  };

  const closeModal = () => {
    setShowModal(false);
    // setShowExpenseIncomeWindow(false);
  };

  function handleKeyDown(event: KeyboardEvent<HTMLSpanElement>) {
    if (event.key === "Enter") {
      setShowModal(true);
    }
  }

  return (
    <div className={cn(className, styles["profile-icon-main"])} {...props}>
      <div className={styles["row-elements"]}>
        <span className={styles["img-profile"]}>
          <ImgProfile />
        </span>
        {isPremiumActive === false ? (
          <span
            role="button"
            className={styles["plus-profile"]}
            onClick={() => {
              setShowModal(true);
            }}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <PlusProfile />
          </span>
        ) : (
          <div className={styles["premium-pluses"]}>
            <span
              role="button"
              className={styles["plus-profile"]}
              onClick={() => {
                setShowModal(true);
              }}
              onKeyDown={handleKeyDown}
              tabIndex={0}
            >
              <PremiumPlusProfile />
            </span>
            <span
              role="button"
              className={styles["plus-profile"]}
              onClick={() => {
                setShowModal(true);
              }}
              onKeyDown={handleKeyDown}
              tabIndex={0}
            >
              <PremiumPlusProfile />
            </span>
            <span
              role="button"
              className={styles["plus-profile"]}
              onClick={() => {
                setShowModal(true);
              }}
              onKeyDown={handleKeyDown}
              tabIndex={0}
            >
              <PremiumPlusProfile />
            </span>
            <span
              role="button"
              className={styles["plus-profile"]}
              onClick={() => {
                setShowModal(true);
              }}
              onKeyDown={handleKeyDown}
              tabIndex={0}
            >
              <PremiumPlusProfile />
            </span>
          </div>
        )}
      </div>
      <div className={styles["custom-modal"]}>
        <FriendInvitation active={showModal} onClose={closeModal} />
      </div>
      <div className={styles["profile-icon-footer"]}>
        <span>Имя пользователя</span>
        <div className={styles["footer-container"]}>
          <span>{copiedText}</span>
          <span
            role="button"
            className={styles["mail-copy"]}
            onClick={() => {
              copyToClipboard(copiedText);
            }}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <MailCopy />
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProfileIcon;
