import React, { useState } from "react";
import { withLayout } from "../layout/Layout";
import ProfileMenu from "../page-components/ProfileMenu/ProfileMenu";
import ProfileIcon from "../page-components/ProfileIcon/ProfileIcon";

function ProfilePage(): JSX.Element {
  const isPremiumActive = false;

  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  const toggleNotifications = () => {
    setIsNotificationsEnabled(!isNotificationsEnabled);
  };

  return (
    <>
      <ProfileIcon isPremiumActive={isPremiumActive} />
      <ProfileMenu
        isNotificationsEnabled={isNotificationsEnabled}
        onToggleNotifications={toggleNotifications}
      />
    </>
  );
}

export default withLayout(ProfilePage, "hidden");
