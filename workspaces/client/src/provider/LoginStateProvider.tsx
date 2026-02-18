import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface LoginState {
    isLoggedIn: boolean;
    username: string | null;
    expiresAt: number | null;
}

interface LoginContextType extends LoginState {
    login: (username: string) => void;
    logout: () => void;
    refreshExpiration: () => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

const EXPIRATION_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

export const LoginStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loginState, setLoginState] = useState<LoginState>({
        isLoggedIn: false,
        username: null,
        expiresAt: null,
    });

    const login = useCallback((username: string) => {
        const expiresAt = Date.now() + EXPIRATION_TIME;
        setLoginState({
            isLoggedIn: true,
            username,
            expiresAt,
        });
    }, []);

    const logout = useCallback(() => {
        setLoginState({
            isLoggedIn: false,
            username: null,
            expiresAt: null,
        });
    }, []);

    const refreshExpiration = useCallback(() => {
        setLoginState((prev) =>
            prev.isLoggedIn ? { ...prev, expiresAt: Date.now() + EXPIRATION_TIME } : prev
        );
    }, []);

    // Check expiration on a timer
    useEffect(() => {
        if (!loginState.isLoggedIn || !loginState.expiresAt) return;

        const checkExpiration = setInterval(() => {
            if (loginState.expiresAt && Date.now() > loginState.expiresAt) {
                logout();
            }
        }, 1000);

        return () => clearInterval(checkExpiration);
    }, [loginState.isLoggedIn, loginState.expiresAt, logout]);

    return (
        <LoginContext.Provider value={{ ...loginState, login, logout, refreshExpiration }}>
            {children}
        </LoginContext.Provider>
    );
};

export const useLoginState = () => {
    const context = useContext(LoginContext);
    if (!context) {
        throw new Error('useLoginState must be used within LoginStateProvider');
    }
    return context;
};