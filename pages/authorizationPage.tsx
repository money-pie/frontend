import React, { useState } from "react";
import AuthorizationForm from "../components/modules/AuthorizationForm/AuthorizationForm";

function AuthorizationPage(): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(true);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <AuthorizationForm active={showModal} onClose={closeModal} />
    </div>
  );
}

export default AuthorizationPage;
