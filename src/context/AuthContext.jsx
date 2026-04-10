import { createContext, useState } from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }) {

  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = (jwtToken) => {
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}