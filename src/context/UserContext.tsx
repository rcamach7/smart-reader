import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import axios from 'axios';
import { UserType } from '@/types/index';

interface UserContextType {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  loadUser?: () => void;
  logout: () => Promise<void>;
  isUserLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<UserType | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  async function fetchUser() {
    setIsUserLoading(true);
    try {
      const res = await axios.get('/api/auth/user');
      setIsUserLoading(false);
      return res.data.user;
    } catch (error) {
      console.log(error);
      setIsUserLoading(false);
      return null;
    }
  }

  async function loadUser() {
    const userData: UserType = await fetchUser();
    setUser(userData);
  }

  async function logout() {
    try {
      await axios.post('/api/auth/logout');
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logout, isUserLoading }}>
      {children}
    </UserContext.Provider>
  );
}
