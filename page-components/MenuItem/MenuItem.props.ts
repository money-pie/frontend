import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface MenuItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
  demo: boolean;
}
