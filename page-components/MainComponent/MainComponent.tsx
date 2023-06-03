import cn from "classnames";
import React, { useState } from "react";
import { MainComponentProps } from "./MainComponent.props";
import styles from "./MainComponent.module.css";
import Htag from "../../components/elements/Htag/Htag";
import DetailedInformation from '../../components/modules/DetailedInformation/DetailedInformation';

function MainComponent({
  className,
  children,
  title,
  sum,
  id,
  ...props
}: MainComponentProps): JSX.Element {
  interface IconData {
    icon: JSX.Element;
    color: string;
  }

  const getIconByTitle = (category: string): IconData => {
    const titleLowercase = category.toLowerCase();


    if (titleLowercase.includes("продукты")) {
      return {
        icon: <img src="/images/icon1.svg" alt="Icon" />,
        color: "var(--complement-weak)",
      };
    }

    if (titleLowercase.includes("здоровье")) {
      return {
        icon: <img src="/images/icon2.svg" alt="Icon" />,
        color: "var(--complement-weak)",
      };
    }

    if (titleLowercase.includes("развлечения")) {
      return {
        icon: <img src="/images/icon3.svg" alt="Icon" />,
        color: "var(--complement-weak)",
      };
    }

    if (titleLowercase.includes("жкх")) {
      return {
        icon: <img src="/images/icon4.svg" alt="Icon" />,
        color: "var(--complement-weak)",
      };
    }

    if (titleLowercase.includes("обучение")) {
      return {
        icon: <img src="/images/icon5.svg" alt="Icon" />,
        color: "var(--complement-weak)",
      };
    }

    if (titleLowercase.includes("фитнес")) {
      return {
        icon: <img src="/images/icon6.svg" alt="Icon" />,
        color: "var(--complement-weak)",
      };
    }

    if (titleLowercase.includes("транспорт")) {
      return {
        icon: <img src="/images/icon7.svg" alt="Icon" />,
        color: "var(--complement-weak)",
      };
    }

    if (titleLowercase.includes("налоги")) {
      return {
        icon: <img src="/images/icon8.svg" alt="Icon" />,
        color: "var(--complement-weak)",
      };
    }

    // Для поступлений

    if (titleLowercase.includes("зарплата")) {
      return {
        icon: <img src="/images/icon1income.svg" alt="Icon" />,
        color: "var(--accent-strong)",
      };
    }

    if (titleLowercase.includes("награда")) {
      return {
        icon: <img src="/images/icon2income.svg" alt="Icon" />,
        color: "var(--accent-strong)",
      };
    }

    if (titleLowercase.includes("подарок")) {
      return {
        icon: <img src="/images/icon3income.svg" alt="Icon" />,
        color: "var(--accent-strong)",
      };
    }

    if (titleLowercase.includes("продажа")) {
      return {
        icon: <img src="/images/icon4income.svg" alt="Icon" />,
        color: "var(--accent-strong)",
      };
    }

    if (titleLowercase.includes("другое")) {
      return {
        icon: <img src="/images/icon5income.svg" alt="Icon" />,
        color: "var(--accent-strong)",
      };
    }

    // Иконка по умолчанию, если заголовок не совпал ни с одним условием

    return {
      icon: <img src="/images/icondefault.svg" alt="Icon" />,
      color: "var(--accent-weak)",
    };
  };

  const iconData = getIconByTitle(title);
  const { icon, color } = iconData;
  const [showDetailedInfo, setShowDetailedInfo] = useState<boolean>(false);

  const closeInfoModal = () => {
    setShowDetailedInfo(false);
  };

  return (
    <div onClick={() => setShowDetailedInfo(true)} className={cn(className, styles["main-component"])} {...props}>
      <div className={styles["space-row"]}>
        <div className={styles["icon-size"]}>{icon}</div>
        <div className={styles.column}>
          <Htag className={styles.h3} tag="h3">
            {title}
          </Htag>
          <p>{children}</p>
        </div>
        <span style={{ color }}>{color === "var(--accent-strong)" ? `+${sum}₽` : `-${sum}₽`}</span>
      </div>
    </div>
  );
}

export default MainComponent;
