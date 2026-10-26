import { createContext } from 'react';

export interface AuthInfo {
    accessToken: string;
    refreshToken: string;
    userId: string;
    name?: string;
}

export interface AuthMethods {
    login: (authInfo: AuthInfo) => void;
    logout: () => void;
    setUserName: (name: string) => void;
}

export type AuthContextModel = AuthInfo & AuthMethods;

export const AuthContext = createContext<AuthContextModel | null>(null);
