import cn from "classnames";
import { ButtonProps } from "./Button.props";
import styles from "./Button.module.css";

function Button({ appearance, children, className, btnType, ...props }: ButtonProps): JSX.Element {
  return (
    <button
      type={btnType}
      className={cn(styles.button, className, {
        [styles.premium]: appearance === "premium",
        [styles.ghost]: appearance === "ghost",
        [styles.casual]: appearance === "casual",
        [styles.ordinary]: appearance === "ordinary",
      })}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
