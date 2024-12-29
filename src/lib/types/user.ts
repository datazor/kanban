export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}