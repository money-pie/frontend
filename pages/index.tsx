import Head from "next/head";
import { useState } from "react";
import Htag from "../components/elements/Htag/Htag";
import Button from "../components/elements/Button/Button";
import Input from "../components/elements/Input/Input";
import ExpenseAndIncomeWindow from "../components/modules/ExpenseAndIncomeWindow/ExpenseAndIncomeWindow";

export default function Home(): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Htag tag="h1">MoneyPie</Htag>
      <Htag tag="h2">Цель на месяц</Htag>
      <Htag tag="h3">Продукты</Htag>
      <Htag tag="h4">Подсказка</Htag>

      <Input appearance="normal" placeholder="Сумма" />

      <Button appearance="premium" className="rounded" btnType="button">
        Купить
      </Button>
      <Button appearance="ghost" className="rounded" btnType="button">
        Статистика
      </Button>
      <Button appearance="casual" className="rounded" btnType="button">
        Установить
      </Button>
      <Button appearance="ordinary" className="rounded" btnType="button">
        Да
      </Button>
      <Button
        appearance="ordinary"
        className="rounded"
        btnType="button"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Проверить модальное окно
      </Button>
      {/* <QuestionModalWindow active={showModal} onClose={closeModal} text="сменить имя пользователя?"/> */}
      {/* <SubscriptionBanner active={showModal} onClose={closeModal} /> */}
      {/* <SubscriptionRenewal active={showModal} onClose={closeModal} /> */}
      {/* <TargetAdding active={showModal} onClose={closeModal} /> */}
      {/* <AutorizationForm active={showModal} onClose={closeModal} /> */}
      {/* <RegistrationForm active={showModal} onClose={closeModal} /> */}

      {/* <FriendInvitation active={showModal} onClose={closeModal} /> */}
      {/* <DetailedInformation active={showModal} onClose={closeModal} /> */}
      <ExpenseAndIncomeWindow active={showModal} onClose={closeModal} />
    </div>
  );
}
