import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  // Add any other user properties you need
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  updatePassword: (data: any) => Promise<void>;
  updateUser: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  checkUser: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const url = "http://pelayanandesa.test/api/v1";
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(url + "/login", {
        email,
        password,
      });

      setUser(response.data.user);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
    } catch (error) {
      console.error("Login error", error);
      throw error;
    }
  };

  const updatePassword = async (data: any) => {
    try {
      await axios.post(url + "/reset-password", data);
    } catch (error) {
      console.error("Update password error", error);
      throw error;
    }
  };

  const updateUser = async (data: any) => {
    try {
      const response = await axios.post(url + "/update-profile", data);

      setUser(response.data.user);
    } catch (error) {
      console.error("Update user error", error);
      throw error;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await axios.post(url + "/logout");
      setUser(null);
      delete axios.defaults.headers.common["Authorization"];
    } catch (error) {
      console.error("Logout error", error);
    }
    setLoading(false);
  };

  const checkUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url + "/user");
      setUser(response.data);
      console.log("user", response);
    } catch (error) {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        checkUser,
        loading,
        updateUser,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Add a default export
export default AuthProvider;
