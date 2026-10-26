import { useCallback, useState, type PropsWithChildren } from "react";
import { AuthContext, type AuthInfo } from "./AuthContext";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authInfo, setAuthInfo] = useState<AuthInfo>(() => ({
    accessToken: localStorage.getItem('accessToken') || '',
    refreshToken: '',
    userId: '',
    name: '',
  }));

  const login = (authInfo: AuthInfo) => {
    localStorage.setItem('accessToken', authInfo.accessToken);
    setAuthInfo(authInfo);
  }

  const logout = () => {
    localStorage.removeItem('accessToken');
    setAuthInfo({
      accessToken: '',
      refreshToken: '',
      userId: '',
      name: '',
    });
  }

  const setUserName = useCallback((name: string) => {
    setAuthInfo(prev => ({ ...prev, name }));
  }, [])

  return (
    <AuthContext.Provider value={{ ...authInfo, login, logout, setUserName }}>
      {children}
    </AuthContext.Provider>
  );
}