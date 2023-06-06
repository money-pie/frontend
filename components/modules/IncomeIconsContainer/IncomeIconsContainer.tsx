import { useState } from "react";
import { useAppContext } from '../../../context/AppContext';
import { RuCategory } from '../../../types/constants';
import styles from "./IncomeIconsContainer.module.css";

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

function IncomeIconsContainer() {
  const [selectedIcon, setSelectedIcon] = useState("");
  const { updateCategoryDto } = useAppContext();

  const handleIconClick = (alt: string, ruCategory: RuCategory) => {
    updateCategoryDto(ruCategory);
    setSelectedIcon(alt);
  };

  const icons = [
    {
      imageSrc: "/images/icon1income.svg",
      alt: "icon1income",
      text: RuCategory.SALARY,
      onClick: () => handleIconClick("icon1", RuCategory.SALARY),
      isSelected: selectedIcon === "icon1",
    },
    {
      imageSrc: "/images/icon2income.svg",
      alt: "icon2income",
      text: RuCategory.REWARD,
      onClick: () => handleIconClick("icon2", RuCategory.REWARD),
      isSelected: selectedIcon === "icon2",
    },
    {
      imageSrc: "/images/icon3income.svg",
      alt: "icon3income",
      text: RuCategory.PRESENT,
      onClick: () => handleIconClick("icon3", RuCategory.PRESENT),
      isSelected: selectedIcon === "icon3",
    },
    {
      imageSrc: "/images/icon4income.svg",
      alt: "icon4income",
      text: RuCategory.SALES,
      onClick: () => handleIconClick("icon4", RuCategory.SALES),
      isSelected: selectedIcon === "icon4",
    },
  ];

  const icons2 = [
    {
      imageSrc: "/images/icon5income.svg",
      alt: "icon5income",
      text: RuCategory.OTHER,
      onClick: () => handleIconClick("icon5", RuCategory.OTHER),
      isSelected: selectedIcon === "icon5",
    },
  ];

  return (
    <div className={styles.container}>
      <IconRow icons={icons} />
      <IconRow icons={icons2} />
    </div>
  );
}

export default IncomeIconsContainer;
