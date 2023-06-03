import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface SidebarProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isPremiumActive: boolean;
  onClose: () => void;
}
