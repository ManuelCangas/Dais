import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [sharedData, setSharedData] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = (newToken) => {
    setToken(newToken);
    setLoggedIn(true);
    localStorage.setItem("token", newToken); // Almacena el token en localStorage al login
  };

  const logout = () => {
    setToken(null);
    setLoggedIn(false);
    localStorage.removeItem("token"); // Elimina el token de localStorage al logout
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, token, login, logout, sharedData, setSharedData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
