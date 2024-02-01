import React, { ReactNode, useEffect, useState } from "react";

import axios from "src/utils/axios";
import { User } from "src/types/User";

interface IProps {
  children: ReactNode | ReactNode[];
}

interface IUserContextState {
  user: User | null;
  setUserData: (user: User | null) => void;
}

export const UserContext = React.createContext<IUserContextState>({
  user: null,
  setUserData: () => {},
});

export const UserProvider = ({ children }: IProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);

  const getUser = async () => {
    try {
      const userResult = await axios.get("auth/me");
      setUser(userResult.data);
      setLoaded(true);
    } catch (error: any) {
      setUser(null);
      setLoaded(true);
    }
  };

  const setUserData = (value: User | null) => {
    setUser(value);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUserData }}>
      {loaded && children}
    </UserContext.Provider>
  );
};
