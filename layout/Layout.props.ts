import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
  visible: "visible" | "hidden";
  notifications?: boolean;
}
