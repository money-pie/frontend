import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showNotification = (message: string | undefined, type: "success" | "error") => {
  if (type === "error" && message !== undefined) {
    toast.error(message);
  } else if (type === "success" && message !== undefined) {
    toast.success(message);
  }
};
