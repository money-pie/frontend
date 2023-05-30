import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface NotificationsProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
  title: string;
  onClose?: () => void;
}
