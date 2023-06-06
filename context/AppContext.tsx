import { createContext, useContext, useState } from 'react';
import { QueryClient, useQuery } from 'react-query';
import { getServerURL } from '../lib/api';
import { Category, Kind, Month, RuCategory, RuKind } from '../types/constants';
import { Group } from '../types/group.types';
import { Hint } from '../types/hints.types';
import { TransactionDto, TransactionQuery, TransactionResponse } from '../types/transaction.types';
import { User } from '../types/user.types';
import { showNotification } from '../utils/notification';

type AppContextValue = {
  user: User | undefined;
  group: Group | undefined;
  transactions: TransactionResponse[] | undefined;
  hints: Hint[] | undefined;
  transactionQuery: TransactionQuery | undefined;
  transactionDto: TransactionDto | undefined;
  page: number;
  updatedUserNotification: (updatedUserNotification: void) => void;
  updatedGroupAim: (aim: number) => void;
  updatedUserAim: (aim: number) => void;
  updatePage: (num: number) => void;
  updateCategoryDto: (category: RuCategory) => void;
  updateKindDto: (category: RuKind) => void;
  createSub: () => void;
  unSub: () => void;
  addTransaction: (sum: number, date: string, description: string, kind: RuKind) => void;
  getTransactions: () => void;
  auth: (email: string, password: string) => void;
  reg: (login: string, email: string, password: string) => void;
  invite: (email: string) => void;
  updateGroup: (group: Group) => void,
  logout: () => void,
  getUser: () => void,
  exitGroup: () => void,
  getHints: () => void,
  deleteHint: (id: number) => void,
};

const defaultValue: AppContextValue = {
  user: {
    id: null,
    login: "",
    email: "",
    notification: true,
    aim: 0,
    subId: null,
    groupId: null,
    personal: true,
    kind: Kind.INCOME,
    page: 1,
  },
  group: undefined,
  transactions: [],
  hints: [],
  transactionQuery:
  {
    personal: true,
    category: Category.PRODUCTS,
    kind: Kind.COSTS,
    month: Month.MAY,
    year: 2023,
    page: 1,
    limit: 30,
  },
  transactionDto: undefined,
  page: 1,
  updatedUserNotification: () => { },
  updatedUserAim: () => { },
  updatedGroupAim: () => { },
  updatePage: () => { },
  updateCategoryDto: () => { },
  updateKindDto: () => { },
  createSub: () => { },
  unSub: () => { },
  addTransaction: () => { },
  getTransactions: () => { },
  auth: () => { },
  invite: () => { },
  updateGroup: () => { },
  reg: () => { },
  logout: () => { },
  getUser: () => { },
  exitGroup: () => { },
  getHints: () => { },
  deleteHint: () => { },
};


const AppContext = createContext<AppContextValue>(defaultValue);
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}

export function AppProvider({ children, queryClient }: { children: React.ReactNode; queryClient: QueryClient; }) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const [page, setPage] = useState<number>(1);
  const [transactionQuery, setTransactionQuery] = useState<TransactionQuery>({
    personal: true,
    category: undefined,
    kind: undefined,
    month: undefined,
    year: 2023,
    page: 1,
    limit: 30,
  });
  const [transactionDto, setTransactionDto] = useState<TransactionDto>(
    {
      sum: 0,
      category: RuCategory.PRODUCTS,
      kind: undefined,
      date: undefined,
      personal: true,
      description: "",
    },
  );

  const updateGroup = async (group: Group) => {
    queryClient.setQueryData<Group>('group', group);
    if (user) {
      const updatedUser = { ...user, groupId: group.id };
      queryClient.setQueryData('user', updatedUser);
    }
  };

  const exitGroup = async () => {
    try {
      const response = await fetch(getServerURL('/groups/exit'), {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        if (user) {
          const updatedUser = { ...user, groupId: null };
          queryClient.setQueryData('user', updatedUser);
        }

        queryClient.setQueryData('group', null);
        const updatedTransactions = await getTransactions();
        queryClient.setQueryData('transactions', updatedTransactions);
      } else {
        const errorData = await response.json();
      }
    } catch (error: any) {
    }
  };

  const invite = async (email: string) => {
    try {
      const response = await fetch(getServerURL('/groups/invite'), {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const updatedUserGroup = await response.json();

        if (user) {
          const updatedUser = { ...user, groupId: updatedUserGroup.id };
          queryClient.setQueryData('user', updatedUser);
        }

        queryClient.setQueryData('group', updatedUserGroup);

        const updatedTransactions = await getTransactions();
        queryClient.setQueryData('transactions', updatedTransactions);

      } else {
        const errorData = await response.json();
      }
    } catch (error: any) {
    }
  };

  const auth = async (email: string, password: string) => {
    try {
      const response = await fetch(getServerURL("/auth/login"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        localStorage.setItem("token", token);
        const upUsr = await getUser();
        const upGroup = await getGroup();
        const upTrn = await getTransactions();
        const upHints = await getHints();

        queryClient.setQueryData<Group>('group', upGroup);
        queryClient.setQueryData<User>('user', upUsr);
        queryClient.setQueryData<TransactionResponse[]>('transactions', upTrn);
        queryClient.setQueryData<Hint[]>('hints', upHints);

        window.location.href = ("/main");

      } else {
        const errorData = await response.json();
        showNotification(errorData.message, "error");
      }
    } catch (error: any) {
      showNotification(error.message, "error");
    }
  };

  const reg = async (login: string, email: string, password: string) => {
    try {
      const response = await fetch(getServerURL("/auth/registration"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, login, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        localStorage.setItem("token", token);
        const upUsr = await getUser();
        const upGroup = await getGroup();
        const upTrn = await getTransactions();
        const upHints = await getHints();


        queryClient.setQueryData<Group>('group', upGroup);
        queryClient.setQueryData<User>('user', upUsr);
        queryClient.setQueryData<TransactionResponse[]>('transactions', upTrn);
        queryClient.setQueryData<Hint[]>('hints', upHints);

        window.location.href = ("/main");

      } else {
        const errorData = await response.json();
        showNotification(errorData.message, "error");
      }
    } catch (error: any) {
      showNotification(error.message, "error");
    }
  };

  const updatePage = async (num: number) => {
    setPage(num);
    const upGroup = await getGroup();

    queryClient.setQueryData<Group>('group', upGroup);
    if (num === 2) {
      setTransactionQuery(prevTransactionQuery => ({
        ...prevTransactionQuery,
        personal: false,
      }));
      setTransactionDto(prevTransactionDto => ({
        ...prevTransactionDto,
        personal: false,
      }));
    } else if (num === 1) {
      setTransactionQuery(prevTransactionQuery => ({
        ...prevTransactionQuery,
        personal: true,
      }));
      setTransactionDto(prevTransactionDto => ({
        ...prevTransactionDto,
        personal: true,
      }));
    }
  };

  const updateCategoryDto = async (category: RuCategory) => {
    transactionDto.category = category;
  };

  const updateKindDto = async (kind: RuKind) => {
    transactionDto.kind = kind;
  };

  const logout = async () => {
    if (typeof window === 'undefined') {
      return null;
    }
    localStorage.clear();
    window.location.href = "/";
  };

  const addTransaction = async (sum: number, date: string, description: string, kind: RuKind) => {
    try {
      const response = await fetch(getServerURL('/transactions/add'), {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sum,
          category: transactionDto.category,
          kind,
          date,
          personal: transactionDto.personal,
          description
        }),
      });

      if (response.ok) {
        const res = await response.json();
        const upTrn = await getTransactions();
        queryClient.setQueryData<TransactionResponse[]>('transactions', upTrn);
      } else if (response.status === 400) {
        const errorData = await response.json();
        if (!user?.subId) {
          window.location.href = "/subscriptionPage";
        }
      }
    } catch (error: any) {
    }
  };

  const createSub = async () => {
    try {
      const response = await fetch(getServerURL('/subscriptions/subscribe'), {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const res = await response.json();
        if (res.active) {
          if (user) {
            const updatedUser: User = {
              ...user,
              subId: res.id,
            };

            const upUsr = await getUser();
            const upGroup = await getGroup();

            queryClient.setQueryData<Group>('group', upGroup);
            queryClient.setQueryData<User>('user', updatedUser);
          }
        }

      } else {
        const errorData = await response.json();
      }
    } catch (error: any) {
    }
  };

  const unSub = async () => {
    try {
      const response = await fetch(getServerURL('/subscriptions/unsub'), {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        if (user) {
          const updatedUser: User = {
            ...user,
            subId: null,
          };

          queryClient.setQueryData<User>('user', updatedUser);
        }


      } else {
        const errorData = await response.json();
      }
    } catch (error: any) {
    }
  };

  const updatedUserNotification = async () => {
    try {
      const response = await fetch(getServerURL('/users/notifications'), {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const updatedUserNotificationData = await response.json();
        if (user) {
          const updatedUser: User = {
            ...user,
            notification: updatedUserNotificationData,
          };
          const upHints = await getHints();

          queryClient.setQueryData<Hint[]>('hints', upHints);

          queryClient.setQueryData<User>('user', updatedUser);
        }


      } else {
        const errorData = await response.json();
      }
    } catch (error: any) {
    }
  };

  const updatedUserAim = async (aim: number) => {
    try {
      const response = await fetch(getServerURL(`/users/aim/${aim}`), {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        if (user) {
          const updatedUser: User = {
            ...user,
            aim: aim,
          };

          queryClient.setQueryData<User>('user', updatedUser);
        }
      } else {
        const errorData = await response.json();
      }
    } catch (error: any) {
    }
  };

  const updatedGroupAim = async (aim: number) => {
    try {
      const response = await fetch(getServerURL(`/groups/aim/${aim}`), {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        if (group) {
          const updatedGroup: Group = {
            ...group,
            aim: aim,
          };

          queryClient.setQueryData<Group>('group', updatedGroup);
        }
      } else {
        const errorData = await response.json();
      }
    } catch (error: any) {
    }
  };

  const deleteHint = async (id: number) => {
    try {
      // Здесь вы можете выполнить get-запрос для получения данных User
      if (typeof window === 'undefined') {
        return null;
      }
      const response = await fetch(getServerURL(`/hints/${id}`), {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const hintsData = await response.json();
        const upHints = await getHints();

        queryClient.setQueryData<Hint[]>('hints', upHints);
      }
    } catch (error: any) {
    }
  };

  const getUser = async () => {
    try {
      if (typeof window === 'undefined') {
        return null;
      }
      const response = await fetch(getServerURL("/users/one"), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const userData = await response.json();

        return userData;
      } else {
        const errorData = await response.json();
        return null;
      }
    } catch (error: any) {
      return null;
    }
  };

  const getTransactions = async () => {
    try {
      if (typeof window === 'undefined') {
        return null;
      }
      const response = await fetch(getServerURL(`/transactions/all/${transactionDto.personal}`), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const transactionsData = await response.json();

        return transactionsData;
      } else {
        return null;
      }
    } catch (error: any) {
      return null;
    }
  };

  const getGroup = async () => {
    try {
      if (typeof window === 'undefined') {
        return null;
      }

      const response = await fetch(getServerURL(`/groups/find/${user?.groupId}`), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const groupData = await response.json();
        return groupData;
      } else {
        const errorData = await response.json();
        return [];
      }
    } catch (error: any) {
      return [];
    }
  };

  const getHints = async () => {
    try {
      if (typeof window === 'undefined') {
        return null;
      }
      const response = await fetch(getServerURL(`/hints/all`), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const hintsData = await response.json();
        return hintsData;
      } else {
        return null;
      }
    } catch (error: any) {
      return null;
    }
  };

  const { data: user } = useQuery<User>('user', getUser);

  const { data: transactions, isLoading } = useQuery<TransactionResponse[]>(
    'transactions',
    getTransactions,
  );

  const { data: hints } = useQuery<Hint[]>(
    'hints',
    getHints,
  );

  const { data: group } = useQuery<Group>('group', getGroup);

  const value: AppContextValue = {
    user,
    transactions,
    hints,
    transactionQuery,
    transactionDto,
    page,
    group,
    unSub,
    createSub,
    updateKindDto,
    updatedGroupAim,
    updateCategoryDto,
    updatedUserNotification,
    updatedUserAim,
    updatePage,
    addTransaction,
    getTransactions,
    getUser,
    auth,
    invite,
    updateGroup,
    reg,
    logout,
    exitGroup,
    getHints,
    deleteHint,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
