import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AuthGuard: React.FC<{ children: React.ReactNode; }> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Проверка статуса авторизации
    setAuthenticated(checkAuthStatus()); // Здесь необходимо реализовать вашу логику проверки авторизации

    // Если пользователь не авторизован, перенаправляем на страницу авторизации
    if (!isAuthenticated) {
      router.push("/authorizationPage");
    }
  }, []);

  function checkAuthStatus() {
    // Проверка наличия токена в localStorage
    const token = localStorage.getItem("token");

    // Возвращение значения true, если токен существует, в противном случае возвращение false
    return !!token;
  }

  console.log("IS AUTH = ", isAuthenticated);

  // Если пользователь авторизован, отображаем содержимое защищенного маршрута
  return isAuthenticated ? <>{children}</> : null;
};

export default AuthGuard;
