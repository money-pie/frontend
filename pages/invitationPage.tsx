import React, { useState } from "react";
import AuthGuard from '../components/guards/AuthGuard/AuthGuard';
import FriendInvitation from "../components/modules/FriendInvitation/FriendInvitation";

function InvitationPage(): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(true);

  const closeModal = () => {
    window.location.href = "/";
  };

  return (
    <AuthGuard>
      <div>
        <FriendInvitation active={showModal} onClose={closeModal} />
      </div>
    </AuthGuard>
  );
}

export default InvitationPage;
