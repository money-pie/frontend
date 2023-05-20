import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface DemoModeProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
}
