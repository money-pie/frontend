import React, { useState } from "react";
import SubscriptionBanner from "../components/modules/SubscriptionBanner/SubscriptionBanner";

function SubscriptionPage(): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(true);

  const closeModal = () => {
    window.location.href = "/";
  };

  return (
    <div>
      <SubscriptionBanner active={showModal} onClose={closeModal} />
    </div>
  );
}

export default SubscriptionPage;
