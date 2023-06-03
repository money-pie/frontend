import React, { useState } from "react";
import AuthGuard from '../components/guards/AuthGuard/AuthGuard';
import SubscriptionBanner from "../components/modules/SubscriptionBanner/SubscriptionBanner";

function SubscriptionPage(): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(true);

  const closeModal = () => {
    window.location.href = "/";
  };

  return (
    <AuthGuard>
      <div>
        <SubscriptionBanner active={showModal} onClose={closeModal} />
      </div>
    </AuthGuard>
  );
}

export default SubscriptionPage;
