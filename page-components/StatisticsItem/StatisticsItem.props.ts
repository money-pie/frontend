import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface StatisticsItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  onCategoryChange: (category: string) => void;
}
