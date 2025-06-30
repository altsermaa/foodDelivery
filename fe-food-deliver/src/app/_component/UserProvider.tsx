"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  userId: string | null;
  isAdmin: boolean;
};

type AuthContextType = {
  user: User;
  tokenChecker: (token: string) => Promise<boolean>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  const [user, setUser] = useState<User>({ userId: null, isAdmin: false });

  const tokenChecker = async (token: string) => {
    try {
      const response = await axios.post(
        "https://fooddelivery-q3yg.onrender.com/verify",
        {
          token,
        }
      );
      console.log(response);
      setUser({ userId: response.data.userId, isAdmin: response.data.isAdmin });
      return response.data.isAdmin;
    } catch (error) {
      // router.push("/login");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      tokenChecker(token);
    } else {
      // router.push("/login");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, tokenChecker }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext<AuthContextType>(AuthContext);
