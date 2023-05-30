import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface StatisticsMenuProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
}
