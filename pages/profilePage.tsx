import React from "react";
import { withLayout } from "../layout/Layout";
import ProfileMenu from "../page-components/ProfileMenu/ProfileMenu";
import ProfileIcon from "../page-components/ProfileIcon/ProfileIcon";
import AuthGuard from '../components/guards/AuthGuard/AuthGuard';
import { useAppContext } from '../context/AppContext';

function ProfilePage(): JSX.Element {
  let isPremiumActive = false;
  const { user, group } = useAppContext();
  if (user) {
    if (user.subId) {
      isPremiumActive = true;
    }
  }

  return (
    <AuthGuard>
      <ProfileIcon isPremiumActive={isPremiumActive} />
      <ProfileMenu />
    </AuthGuard>
  );
}

export default withLayout(ProfilePage, "hidden", true);
