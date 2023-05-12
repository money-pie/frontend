import cn from "classnames";
import { HtagProps } from "./Htag.props";
import styles from "./Htag.module.css";

function Htag({ tag, children, className }: HtagProps): JSX.Element {
  switch (tag) {
  case "h1":
      return <h1 className={cn(styles.h1, className)}>{children}</h1>;
  case "h2":
      return <h2 className={cn(styles.h2, className)}>{children}</h2>;
  case "h3":
      return <h3 className={cn(styles.h3, className)}>{children}</h3>;
  case "h4":
      return <h4 className={cn(styles.h4, className)}>{children}</h4>;
  case "h5":
      return <h5 className={cn(styles.h5, className)}>{children}</h5>;
  case "h6":
      return <h6 className={cn(styles.h6, className)}>{children}</h6>;
  default:
    return <></>;
  }
}

export default Htag;
