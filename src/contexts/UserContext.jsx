import { createContext, useState, useEffect } from "react";
import { api } from "../utilities";

export const userContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("localUser")) ?? null
  );

  const getUser = async () => {
    let response = await api.get("users/");

    setUser(response.data);
    console.log(user);
  };

  useEffect(() => {
    localStorage.setItem("localUser", JSON.stringify(user));
  }, [user]);

  return (
    <userContext.Provider value={{ user, setUser, getUser }}>
      {children}
    </userContext.Provider>
  );
}
