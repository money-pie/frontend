import { useRouter } from 'next/router';
import React, { useState } from "react";
import AuthGuard from '../components/guards/AuthGuard/AuthGuard';
import SubscriptionBanner from "../components/modules/SubscriptionBanner/SubscriptionBanner";

function SubscriptionPage(): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(true);
  const router = useRouter();

  const closeModal = () => {
    router.push("/main");
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
