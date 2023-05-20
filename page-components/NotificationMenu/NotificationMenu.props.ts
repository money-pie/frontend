import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface NotificationMenuProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
}
