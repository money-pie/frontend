import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface HeaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  visible: "visible" | "hidden";
  notifications?: boolean;
}
