import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface StatisticsItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  onKindChange: (kind: string) => void;
  onMonthChange: (month: string) => void;
  onYearChange: (year: string) => void;
  onCellClickIndex: (index: number) => void;
}
