import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TokenGuard: React.FC<{ children: React.ReactNode; }> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkedAuth: boolean = checkAuthStatus();

    setAuthenticated(checkedAuth);
    if (checkedAuth) {
      router.push("/main");
    }
  }, [isAuthenticated]);

  function checkAuthStatus() {
    const token = localStorage.getItem("token");
    return !!token;
  }


  return !isAuthenticated ? <>{children}</> : null;
};

export default TokenGuard;
