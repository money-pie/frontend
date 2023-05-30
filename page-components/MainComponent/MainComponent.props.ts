import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface MainComponentProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
  title: string;
  sum: number;
}
