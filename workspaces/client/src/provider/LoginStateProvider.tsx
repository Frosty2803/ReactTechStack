import type { RegisterInput } from "@react-tech-stack/shared";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useLoginUser } from "../api/useLoginUser";
import { useLogoutUser } from "../api/useLogoutUser";

interface LoginState {
  token: string | null;
  username: string | null;
  expiresAt: number | null;
}

interface LoginContextType extends LoginState {
  login: (data: RegisterInput) => void;
  logout: () => void;
  refreshExpiration: () => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

const EXPIRATION_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

export const LoginStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { mutate: apiLogin } = useLoginUser();
  const { mutate: apiLogout } = useLogoutUser();
  const [loginState, setLoginState] = useState<LoginState>({
    token: null,
    username: null,
    expiresAt: null,
  });

  const login = useCallback((data: RegisterInput) => {
    const expiresAt = Date.now() + EXPIRATION_TIME;
    apiLogin(data, {
      onSuccess: (response) => {
        console.log('Passed on Success Callback:', response);
        setLoginState({
          token: response.token,
          username: response.username,
          expiresAt,
        });
        window.location.href = "/home";
      },
    });
  }, [apiLogin]);

  const logout = useCallback(() => {
    if(!loginState.token){
        return;
    }
    apiLogout(loginState.token, {
        onSettled: (response) => {
            console.log('Passed on Logout Success Callback:', response);
            setLoginState({
              token: null,
              username: null,
              expiresAt: null,
            });
            window.location.href = "/login";
        },
    })
  }, [apiLogout, loginState.token]);

  const refreshExpiration = useCallback(() => {
    setLoginState((prev) =>
      prev.token
        ? { ...prev, expiresAt: Date.now() + EXPIRATION_TIME }
        : prev,
    );
  }, []);

  // Check expiration on a timer
  useEffect(() => {
    if (!loginState.token || !loginState.expiresAt) return;

    const checkExpiration = setInterval(() => {
      if (loginState.expiresAt && Date.now() > loginState.expiresAt) {
        logout();
      }
    }, 1000);

    return () => clearInterval(checkExpiration);
  }, [loginState.token, loginState.expiresAt, logout]);

  return (
    <LoginContext.Provider
      value={{ ...loginState, login, logout, refreshExpiration }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginState = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLoginState must be used within LoginStateProvider");
  }
  return context;
};
