import cn from "classnames";
import { InputProps } from "./Input.props";
import styles from "./Input.module.css";

function Input({ appearance, className, ...props }: InputProps): JSX.Element {
  return (
    <input
      className={cn(className, styles.input, {
        [styles.normal]: appearance === "normal",
        [styles.ghost]: appearance === "ghost",
      })}
      {...props}
    />
  );
}

export default Input;
