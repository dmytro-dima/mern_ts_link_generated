import { createContext } from "react";

interface AuthContext {
  token: string | null;
  userId: string | null;
  login: (token: string, id: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContext>({
  token: null,
  userId: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});
