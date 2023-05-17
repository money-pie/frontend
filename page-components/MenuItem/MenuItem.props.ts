import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface MenuItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
}
