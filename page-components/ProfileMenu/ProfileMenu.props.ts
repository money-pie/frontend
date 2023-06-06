import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface ProfileMenuProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
}
