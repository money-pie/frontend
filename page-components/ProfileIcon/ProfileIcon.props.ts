import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ProfileIconProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isPremiumActive: boolean;
}
