import cn from "classnames";
import React, { useState, KeyboardEvent, useEffect } from "react";
import { MainTargetProps } from "./MainTarget.props";
import styles from "./MainTarget.module.css";
import Button from "../../components/elements/Button/Button";
import Htag from "../../components/elements/Htag/Htag";
import TargetAdding from "../../components/modules/TargetAdding/TargetAdding";
import { useAppContext } from '../../context/AppContext';
import { useRouter } from 'next/router';

export function MainTarget({ className, ...props }: MainTargetProps): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { user, group, transactionQuery } = useAppContext();
  const router = useRouter();

  const closeModal = () => {
    setShowModal(false);
  };

  function handleKeyDown(event: KeyboardEvent<HTMLSpanElement>) {
    if (event.key === "Enter") {
      setShowModal(true);
    }
  }

  const goToPage = () => {
    if (user) {
      router.push("/statistics");
    } else {
      router.push("/statisticsPage");
    }
  };

  return (
    <div className={cn(className, styles["main-target"])} {...props}>
      {
        props.demo
          ?
          <span>
            {
              props.aim
                ?
                <Htag tag="h2">{props.aim} ₽/месяц</Htag>
                :
                <Htag tag="h2">Установить цель</Htag>
            }
          </span>
          :
          <span
            role="button"
            onClick={() => {
              setShowModal(true);
            }}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {
              transactionQuery?.personal
                ?
                <Htag tag="h2">{user?.aim} ₽/месяц</Htag>
                :
                user?.groupId
                  ?
                  <Htag tag="h2">{group?.aim} ₽/месяц</Htag>
                  :
                  <Htag tag="h2">Установить цель</Htag>
            }
          </span>
      }
      <div className={styles["target-row"]}>
        <div className={styles["target-line"]} />
        <Button
          appearance="ghost"
          className={`${styles["custom-button"]} rounded`}
          btnType="button"
          onClick={() => {
            goToPage();
          }}
        >
          Статистика
        </Button>
      </div>
      <TargetAdding active={showModal} onClose={closeModal} />
    </div>
  );
}

export default MainTarget;
