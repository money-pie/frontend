import cn from "classnames";
import React from "react";
import { DemoModeProps } from "./DemoMode.props";
import styles from "./DemoMode.module.css";

function DemoMode({ className, children, ...props }: DemoModeProps): JSX.Element {
  return (
    <div className={cn(className, styles["demo-mode"])} {...props}>
      <p>
        Это демо-режим.
        <a href="#">Зарегистрируйтесь </a>
      </p>
    </div>
  );
}

export default DemoMode;
