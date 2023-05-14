import { useState } from "react";
import styles from "./ExpenseIconsContainer.module.css";

type IconProps = {
  imageSrc: string;
  alt: string;
  text: string;
  onClick: () => void;
  isSelected: boolean;
};

function Icon({ imageSrc, alt, text, onClick, isSelected }: IconProps) {
  return (
    <div
      role="button"
      className={`${styles["icon-row-item"]} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.keyCode === 13) {
          onClick();
        }
      }}
      tabIndex={0}
    >
      <img className={styles["icon-row-icon"]} src={imageSrc} alt={alt} />
      <div className={styles["icon-row-text"]}>{text}</div>
    </div>
  );
}

type IconRowProps = {
  icons: IconProps[];
};

function IconRow({ icons }: IconRowProps) {
  return (
    <div className={styles["icon-row"]}>
      {icons.map((icon) => (
        <Icon key={icon.alt} {...icon} />
      ))}
    </div>
  );
}

function ExpenseIconsContainer() {
  const [selectedIcon, setSelectedIcon] = useState("");

  const handleIconClick = (alt: string) => {
    setSelectedIcon(alt);
  };

  const icons = [
    {
      imageSrc: "/images/icon1.svg",
      alt: "icon1",
      text: "Продукты",
      onClick: () => handleIconClick("icon1"),
      isSelected: selectedIcon === "icon1",
    },
    {
      imageSrc: "/images/icon2.svg",
      alt: "icon2",
      text: "Здоровье",
      onClick: () => handleIconClick("icon2"),
      isSelected: selectedIcon === "icon2",
    },
    {
      imageSrc: "/images/icon3.svg",
      alt: "icon3",
      text: "Развлечения",
      onClick: () => handleIconClick("icon3"),
      isSelected: selectedIcon === "icon3",
    },
    {
      imageSrc: "/images/icon4.svg",
      alt: "icon4",
      text: "ЖКХ",
      onClick: () => handleIconClick("icon4"),
      isSelected: selectedIcon === "icon4",
    },
  ];

  const icons2 = [
    {
      imageSrc: "/images/icon5.svg",
      alt: "icon5",
      text: "Обучение",
      onClick: () => handleIconClick("icon5"),
      isSelected: selectedIcon === "icon5",
    },
    {
      imageSrc: "/images/icon6.svg",
      alt: "icon6",
      text: "Фитнес",
      onClick: () => handleIconClick("icon6"),
      isSelected: selectedIcon === "icon6",
    },
    {
      imageSrc: "/images/icon7.svg",
      alt: "icon7",
      text: "Транспорт",
      onClick: () => handleIconClick("icon7"),
      isSelected: selectedIcon === "icon7",
    },
    {
      imageSrc: "/images/icon8.svg",
      alt: "icon8",
      text: "Налоги",
      onClick: () => handleIconClick("icon8"),
      isSelected: selectedIcon === "icon8",
    },
  ];

  return (
    <div className={styles.container}>
      <IconRow icons={icons} />
      <IconRow icons={icons2} />
    </div>
  );
}

export default ExpenseIconsContainer;
