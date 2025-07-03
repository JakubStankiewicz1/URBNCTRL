import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem("adminUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simple admin authentication - in production, this should be handled by your backend
    if (email === "admin@urbnctrl.com" && password === "admin123") {
      const userData = {
        id: 1,
        email: "admin@urbnctrl.com",
        name: "Administrator",
        role: "admin",
      };
      setUser(userData);
      localStorage.setItem("adminUser", JSON.stringify(userData));
      return { success: true };
    } else {
      return { success: false, error: "Nieprawidłowe dane logowania" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("adminUser");
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
