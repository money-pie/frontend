import React, { useState } from "react";
import RegistrationForm from "../components/modules/RegistrationForm/RegistrationForm";
import styles from "../components/modules/RegistrationForm/RegistrationForm.module.css";

function RegistrationPage(): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(true);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <RegistrationForm active={showModal} onClose={closeModal} />
    </div>
  );
}

export default RegistrationPage;
