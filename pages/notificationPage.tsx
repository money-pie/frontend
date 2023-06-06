import React, { useEffect, useState } from "react";
import { withLayout } from "../layout/Layout";
import NotificationMenu from "../page-components/NotificationMenu/NotificationMenu";
import Notifications from "../page-components/Notifications/Notifications";
import AuthGuard from '../components/guards/AuthGuard/AuthGuard';
import { getServerURL } from '../lib/api';
import { Hint } from '../types/hints.types';
import { useAppContext } from '../context/AppContext';

function NotificationPage(): JSX.Element {
  const [arrHints, setHints] = useState<Hint[]>([]);
  const isLoggedIn = true;
  const { hints } = useAppContext();



  useEffect(() => {
    const fetchHints = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(getServerURL("/hints/all"), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const arrHints: Hint[] = await response.json();
          setHints(arrHints);
        }
      } catch (error: any) {
      }
    };

    fetchHints();
  }, [hints]);

  return (
    <AuthGuard>
      <NotificationMenu>
        {
          arrHints.map((hint: Hint) =>
            <Notifications title={hint.title} hintId={hint.id}>
              {hint.text}
            </Notifications>
          )
        }
      </NotificationMenu>
    </AuthGuard>
  );
}

export default withLayout(NotificationPage, "visible", true);
