import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: ReactNode;
  btnType: "button" | "submit" | "reset";
  appearance: "premium" | "ghost" | "casual" | "ordinary";
}
