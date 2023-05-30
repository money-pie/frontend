import { HTMLAttributes, ReactNode } from "react";

export interface HtagProps extends HTMLAttributes<HTMLHeadingElement> {
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: ReactNode;
  onClick?: () => void;
  onKeyDown?: () => void;
}
