import React from "react";
import { withLayout } from "../layout/Layout";
import NotificationMenu from "../page-components/NotificationMenu/NotificationMenu";
import Notifications from "../page-components/Notifications/Notifications";

function NotificationPage(): JSX.Element {
  const isPremiumActive = false;

  return (
    <NotificationMenu>
      <Notifications title="Совет">
        Определите свои финансовые цели. Это может быть сбережение определенной суммы на будущее,
        покупка недвижимости или оплата образования
      </Notifications>
      <Notifications title="Уведомление" />
      <Notifications title="Подсказка">
        Рекомендуем снизить расходы по категории Развлечения
      </Notifications>
      <Notifications title="Уведомление" />
      <Notifications title="Подсказка">
        Рекомендуем снизить расходы по категории Развлечения
      </Notifications>
    </NotificationMenu>
  );
}

export default withLayout(NotificationPage, "visible");
