import React, { useState } from "react";
import { withLayout } from "../layout/Layout";
import NotificationMenu from "../page-components/NotificationMenu/NotificationMenu";
import Notifications from "../page-components/Notifications/Notifications";
import DemoMode from "../page-components/DemoMode/DemoMode";

function NotificationPage(): JSX.Element {
  const isPremiumActive = false;
  const [isLoggedIn, setIsLoggedIn] = useState(false); // пользователь зарегистрирован или нет

  return (
    <>
      <NotificationMenu>
        <Notifications title="Совет">
          Попробуйте изменить отношение к покупкам. Если хотите купить что-то, чего не было в ваших
          планах, возьмите паузу, как минимум, на сутки. За это время вы сможете трезво оценить,
          действительно ли вам нужна эта вещь
        </Notifications>
        {/* <Notifications title="Уведомление">Пользователь Артем пригласил вас в общий бюджет</Notifications> */}
        <Notifications title="Подсказка">
          Рекомендуем снизить расходы по категории Развлечения
        </Notifications>
        {/* <Notifications title="Уведомление" /> */}
        {/* <Notifications title="Подсказка">
        Рекомендуем снизить расходы по категории Развлечения
      </Notifications> */}
      </NotificationMenu>
      {isLoggedIn ? null : <DemoMode />}
    </>
  );
}

export default withLayout(NotificationPage, "visible");
