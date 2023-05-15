import React from "react";

export interface ModalProps {
  children: React.ReactNode;
  active: boolean;
  closeCross?: "exist" | "none";
  onClose: () => void;
}
