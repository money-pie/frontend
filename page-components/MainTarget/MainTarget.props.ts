import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface MainTargetProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    demo: boolean;
    aim?: number;
  }
