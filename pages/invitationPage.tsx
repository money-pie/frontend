import { useRouter } from 'next/router';
import React, { useState } from "react";
import AuthGuard from '../components/guards/AuthGuard/AuthGuard';
import FriendInvitation from "../components/modules/FriendInvitation/FriendInvitation";

function InvitationPage(): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(true);
  const router = useRouter();
  const closeModal = () => {
    router.push("/");
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
