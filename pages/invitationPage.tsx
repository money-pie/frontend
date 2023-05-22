import React, { useState } from "react";
import FriendInvitation from "../components/modules/FriendInvitation/FriendInvitation";

function InvitationPage(): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(true);

  const closeModal = () => {
    window.location.href = "/";
  };

  return (
    <div>
      <FriendInvitation active={showModal} onClose={closeModal} />
    </div>
  );
}

export default InvitationPage;
